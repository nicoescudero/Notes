const controller={};
const passport=require('passport');

controller.createUser=passport.authenticate('local-signup',{
    failureRedirect:'/user/signup',
    successRedirect:'/user/session'
});

controller.loginUser=passport.authenticate('local-signin',{
    failureRedirect: '/user/login',
    successRedirect: '/user/session'
})

controller.logout=(req,res)=>{
    req.session.token='';
    req.logout();
    return res.render('login');
}

controller.redirectIndex=(req,res)=>{
    return res.redirect('/');
}

module.exports=controller;