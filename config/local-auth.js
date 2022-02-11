const User=require('../controllers/user/model');
const passport=require('passport');
const LocalStrategy = require('passport-local');
const jwt=require('jsonwebtoken');

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
        const token=await jwt.sign({id:newUser._id,usename:newUser.username},process.env.KEY_TOKEN,{expiresIn: '15m'});
        req.session.token=token;
        const user={
            id:newUser._id,
            username:newUser.username,
        }
        return done(null,user);
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
        if(match)
        {
            const token=await jwt.sign({id:user._id,usename:user.username},process.env.KEY_TOKEN,{expiresIn: '15m'});
            req.session.token=token;
            const userFound={
             id:user._id,
             username:user.username,
            }
            return done(null,userFound);
        }
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