exports.home = async(req,res) => {
    res.render("home");
}

exports.login = async(req,res) => {
    res.render("login", {error: ""});
}

exports.signup = async(req,res) =>{
    res.render("signup", {errors: [], data:[]});
}


exports.dashboard = async(req,res) => {
    const userData = req.user;
    console.log("messages data is", userData);
    res.render("dashboard", {user : userData});
}

exports.clubadmin = async(req,res,next) => {
    res.render("clubAdmin", {user: req.user});
}

exports.fallback = async(req,res,next) => {
    if ( req.user ){
        res.redirect("/dashboard");
    }
    else{
        res.render("fallbackPage"); 
    }
}