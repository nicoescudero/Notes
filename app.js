const express=require('express');
const app=express();
const path=require('path');
const morgan=require('morgan');
const helmet=require('helmet');
const passport=require('passport');
const flash=require('connect-flash');
const session=require('express-session');

require('dotenv').config();
require('./config/database');
require('./config/local-auth');
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(morgan('dev'));
app.use(helmet());
app.use(session({secret:process.env.SECRET_KEY,resave:false,saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
    res.locals.message=req.flash('message');
    res.locals.error=req.flash('error');
    res.locals.user=req.user;
    next();
})
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/',require(path.join(__dirname, 'routes/index.routes')));

app.listen(app.get('port'), ()=>console.log('listening on port ' + app.get('port')));