const {Router} = require('express');
const userRouter = Router();
const userController = require("../controllers/userController");
// const ac = require("../controllers/authenticationController");
const ac = require("../middleware/authentication");
const db = require("../db/queries");
const pc = require("../controllers/passportConfig");

userRouter.get("/", userController.home);
userRouter.get("/login", userController.login);
userRouter.get("/signup", userController.signup);

userRouter.post("/signup",
    ac.validatePassword,
    ac.validateFirstname,
    ac.validateLastname,
    ac.passwordMatch,
    ac.initialize,
    db.emailExists,
    db.checkMembership,
    db.createMember,
    pc.autoLogin
    );
module.exports = {userRouter}