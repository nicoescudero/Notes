const jwt=require('jsonwebtoken');

async function verifyToken(req,res,next){
    if(!req.session.token)res.status(401).json({ message: 'No token provided' });
    const token= req.session.token;
    const decoded=await jwt.verify(token,process.env.KEY_TOKEN);
    if(decoded)return next();
    else return res.redirect('/');
}

module.exports=verifyToken;
