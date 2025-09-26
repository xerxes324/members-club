const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const {body, validationResult} = require('express-validator');

exports.initialize = (req,res,next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty()){
        next(errors.array());
    }
    else{
        next()
    }    
}

exports.validateFirstname = [
    body('firstname')
    .trim()
    .notEmpty().withMessage("Firstname cannot be an empty field.")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Firstname must be alphanumeric.")
    .custom((value, {req}) => {
        if ( value.toLowerCase() === req.body.pwd.toLowerCase()){
            throw new Error("Password and firstname cannot be the same.");
        }
        return true;
    })
]

exports.validateLastname = [
    body('lastname')
    .trim()
    .notEmpty().withMessage("Lastname cannot be an empty field.")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Lastname must be alphanumeric.")
    .custom((value, {req}) => {
        if ( value.toLowerCase() === req.body.pwd.toLowerCase()){
            throw new Error("Password and lastname cannot be the same.")   
        }
        return true;
    })
]

exports.validateEmail = [
    body('email')
    .trim()
    .notEmpty().withMessage("Please enter an email address.")
    .isEmail().withMessage("Please enter a valid email address.")
    .normalizeEmail()
]

exports.validatePassword = [
    body('pwd').isLength({min: 6}).withMessage("The password must be atleast 6 characters long")
];


exports.validateConfirmPassword = [
    body('confirmpwd')
    .notEmpty().withMessage("Please confirm your password.")
]

exports.passwordMatch = [
    body('pwd')
    .custom((value, {req}) => {
        if ( value !== req.body.confirmpwd) {
            throw new Error("Passwords do not match.")
        }
        return true;
    })
]