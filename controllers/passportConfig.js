const passport = require("passport");
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;

exports.autoLogin = async(req, res,next)=>{

    const email = req.body.email; 
    const {rows} = await pool.query("select * from users where username = $1", [email]);
    const user = rows[0];
    req.login(user, function(err){
        if ( err){
            return next(err);
        }
        res.redirect("/dashboard");
    })
}

passport.serializeUser((user,done) => {
    // console.log('serialized!')
    done(null,user.user_id);
})


passport.deserializeUser( async(id, done) => {
    console.log("deserializing...");
    try{
        const {rows} = await pool.query("SELECT * FROM users where user_id = $1",[id]);
        const user = rows[0];

        done(null, user);
    }
    catch(err){
        done(err);
    }
} )

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const {rows} = await pool.query(`
                SELECT * from users where username = $1
                `, [username]);
            const user = rows[0]
            
            if ( !user ){
                throw new Error("Incorrect username");
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match){
                throw new Error("Passwords don't match");
            }
            return done(null,user);
        }
        catch(err){
            done(err);
        }
    })
)

exports.ensureLogin = (req,res,next)=>{

    if ( req.user ){
        next();
    }
    else{
        res.redirect("/home");
    }
}

exports.ensureLogout = (req,res,next) =>{
    if ( req.user ){
        next();
    }
    else{
        res.redirect("/home");
    }
}

exports.userLogout = (req,res,next)=>{
    req.logout(function(err){
        if (err){
            return next(err)
        }
        console.log("Logged out successfully.");
        res.redirect("/home");
    });
}