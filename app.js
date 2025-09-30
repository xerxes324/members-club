const express = require('express');
const app = express();
const router = require("./routes/userRouter");
const session = require('express-session');
const seed = require('./seedSecrets');
require("dotenv").config();
const db = require("./db/queries");
const passport = require('passport');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cats",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/", router.userRouter);

seed.hashSecret();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Listening on port now.");
})