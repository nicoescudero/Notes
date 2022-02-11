const {Router}=require('express');
const routes=Router();
const usrCtrl=require('../controllers/user/controller');
const noteCtrl=require('../controllers/notes/controller');
const {validateCreate,validateLogin}=require('../validators/user');
const verifyToken=require('../helpers/verify-token');

routes.get('/',(req,res)=>res.render('index'));

routes.get('/user/login',(req,res)=>res.render('login'));
routes.get('/user/signup',(req,res)=>res.render('signup'));

routes.post('/user/signup',validateCreate,usrCtrl.createUser);
routes.post('/user/login',validateLogin,usrCtrl.loginUser);
routes.get('/user/session',(req,res)=>res.render('profile'));
routes.get('/user/logout',verifyToken,usrCtrl.logout);

routes.post('/notes/createNote/:id',verifyToken,noteCtrl.createNote);
routes.get('/notes/allNotes',verifyToken,noteCtrl.getAllNotes);
routes.get('/notes/edit/:id',verifyToken,noteCtrl.editNote);
routes.get('/notes/delete/:id',verifyToken,noteCtrl.deleteNote);
routes.post('/notes/update/:id',verifyToken,noteCtrl.updateNote);

module.exports=routes;