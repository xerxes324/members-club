const pool = require("./pool");
const bcrypt = require('bcryptjs');

exports.emailExists = async(req,res,next) => {
    const email = req.body.email;
    try{
        const {rows} = await pool.query("Select * from users where username = $1",[email.toLowerCase()]);
        // console.log(rows, "is the query output")
        if ( rows.length > 0 ){
            next("Email already exists.")
        }
        next();
    }
    catch(err){
        next(err);
    }
}


exports.checkMembership = async(req, res,next) => {
    const {rows} = await pool.query("SELECT code_hash from secretcodes where code_type = 'membership'");
    const check = await bcrypt.compare(req.body.memberpwd, rows[0].code_hash);
    // console.log(check, "is the output");
    if ( check ) {  // passwords dont match
        req.body.status = 'Member';
    }
    else{
        req.body.status = 'Not a member';
    }
    next(); 
}

exports.createMember = async(req,res,next) =>{
    // console.log(req.body);
    const hashedpwd = await bcrypt.hash(req.body.pwd, 10);
    // console.log(hashedpwd);

    try
    {
        await pool.query(`INSERT INTO USERS
            (firstname, lastname, username, password, membership)
            VALUES
            ($1, $2, $3, $4, $5)`,[
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedpwd,
                req.body.status]);   
        next();
    }

    catch(err){
        next(err);
    }
}

exports.signupErrorHandler = async(err,req,res,next) => {
        // console.log(err, "is the err");
        res.render("signup", 
            {errors : Array.isArray(err) ? err : err, data:req.body });
}

exports.addMessage = async(req,res,next) => {

    await pool.query(`INSERT into messages(user_id, title, content, created_at)
        VALUES($1, $2, $3, NOW())
        `,[req.user.user_id, req.body.title, req.body.content]);
    
    res.redirect("/dashboard");
}

exports.deleteMessage = async(req,res,next) => {
    // console.log(req.body.buttonid, "is the button ID.");
    await pool.query(`DELETE from messages
        where id = $1
        `,[req.body.buttonid]);
    res.redirect("/dashboard");
};
