const {Router} = require('express');
const userRouter = Router();
const userController = require("../controllers/userController");
const ac = require("../middleware/authentication");
const db = require("../db/queries");
const pc = require("../controllers/passportConfig");
const msg = require("../controllers/messages");
const passport = require('passport');

userRouter.get("/", userController.home);
userRouter.get("/login", ac.isLoggedin, userController.login);
userRouter.get("/signup", userController.signup);
userRouter.get("/dashboard", 
    pc.ensureLogin,
    msg.getMessages,
    msg.memberAccess,
    userController.dashboard
);
userRouter.get("/home", userController.home);
userRouter.get("/logout", pc.ensureLogout, pc.userLogout);
userRouter.get("/clubadmin", pc.ensureLogin, ac.isAdmin, userController.clubadmin);

userRouter.post("/clubadmin",
    ac.checkAdminPwd
)

userRouter.post("/signup",
    ac.validatePassword,
    ac.validateFirstname,
    ac.validateLastname,
    ac.validateEmail,
    ac.passwordMatch,
    ac.initialize,
    db.emailExists,
    db.checkMembership,
    db.createMember,
    pc.autoLogin
    );


userRouter.use(db.signupErrorHandler);

userRouter.post("/login",
    passport.authenticate("local",
        {
            successRedirect:"/dashboard",
            failureRedirect:"/login",
        }
    )
);


userRouter.loginErrorHandler = (err,req,res,next) =>{
    console.log("HERE!")
    res.render("login", {error : err.message});
}

userRouter.use(userRouter.loginErrorHandler);

userRouter.post("/deleteMessage",
    db.deleteMessage
);

userRouter.post("/dashboard",
    db.addMessage
);

userRouter.get("{*splat}",
    userController.fallback
);

module.exports = {userRouter}