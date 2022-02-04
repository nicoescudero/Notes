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
    req.logout();
    req.flash('message','You are logged out now');
    res.render('login');
}

controller.redirectIndex=(req,res)=>{
    res.redirect('/');
}

module.exports=controller;