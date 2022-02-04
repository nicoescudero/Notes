const mongoose=require('mongoose');
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    serverSelectionTimeoutMS: 5000
}

let uri='';
const {MDB,MDB_URI_PRODUCTION,MDB_URI_DEVELOPMENT}=process.env;

if(MDB==='development')
uri=MDB_URI_DEVELOPMENT;
else uri=MDB_URI_PRODUCTION;



try {
    mongoose.connect(uri,options)
    .then(()=>console.log('Connected to db'));
} catch (error) {
    console.log(error);
    return ;
}
