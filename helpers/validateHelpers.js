const {validationResult}=require('express-validator');

const validateResult=(req,res,next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        const values=req.body;
        res.status(403);
        res.render(`${req.site}`,{validations:err.array(),values});
    }
}

module.exports={validateResult};