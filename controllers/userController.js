exports.home = async(req,res) => {
    res.render("home");
}

exports.login = async(req,res) => {
    res.render("login");
}

exports.signup = async(req,res) =>{
    res.render("signup", {errors: [], data:[], dberror:null});
}


exports.dashboard = async(req,res) => {
    // const {firstname, lastname, email, pwd, memberpwd} = req.body;
    const userData = req.body;
    res.render("dashboard", {userData});
}