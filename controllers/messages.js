const pool = require("../db/pool");
exports.getMessages = async(req,res,next)=>{
    const {rows} = await pool.query("SELECT * FROM messages");
    // console.log(rows, "is the messages rows.");
    req.user.data = rows;
    next();
}

exports.memberAccess = async(req,res,next) => {
    const storage = [];
    if ( req.user.membership === 'Member'){
        const data = req.user.data;
        data.forEach(e => {
            storage.push(e.user_id);
        });

        const {rows} = await pool.query(`SELECT user_id, firstname, lastname
            FROM users
            WHERE user_id = ANY($1)`,[storage]);
        req.user.names = rows;
    }
    next();
}