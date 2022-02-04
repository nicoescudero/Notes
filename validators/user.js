const {body}=require('express-validator');
const {validateResult}=require('../helpers/validateHelpers');

const validateCreate = [
    body('username','Username must be at least 3 chars long')
        .exists()
        .notEmpty()
        .isLength({min:3})
        .trim()
        .escape(),
    body('email','You need a valid email address')
        .exists()
        .not().isEmpty()
        .isEmail()
        .normalizeEmail(),
    body('password','Password must be at least 8 characters long')
    .exists()
    .not().isEmpty()
    .isLength({min:8}),
    (req,res,next) => {
        req.site='signup';
        validateResult(req,res,next);
    }
]

const validateLogin=[
    body('email','You need a valid email address')
        .exists()
        .not().isEmpty()
        .isEmail()
        .normalizeEmail(),
    body('password','Invalid Password')
    .exists()
    .not().isEmpty()
    .isLength({min:8}),
    (req,res,next) => {
        req.site='login';
        validateResult(req,res,next);
    }
]

module.exports={ validateCreate,validateLogin };