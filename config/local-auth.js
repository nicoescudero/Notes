const User=require('../controllers/user/model');
const passport=require('passport');
const LocalStrategy = require('passport-local');

passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,password,done)=>{
    const {username}=req.body;
    const user_exist=await User.findOne({email:email});
    if(user_exist)
    done(null,false,req.flash('error','There is already an account with this email address'));
    else{
        const newUser=new User({
            username,
            email,
            password:await User.encryptPassword(password)
        });
        await newUser.save();
        done(null,newUser);    
    }
}));

passport.use('local-signin',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
},async(req,email,password,done)=>{
    const user=await User.findOne({email:email});
    if(!user)return done(null,false,req.flash('error','Not user found'));
    else{
        const match=await user.verifyPassword(password);
        if(match)return done(null,user);
        else return done(null,false,req.flash('error','Invalid Password'));
    }
}));

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async(id,done) => {
    const user=await User.findById(id);
    done(null,user);
});