const {Schema,model}=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    notes:[{
        type: Schema.Types.ObjectId,
        ref:'Notes',
        required:true
    }]
});

userSchema.statics.encryptPassword = async (password)=>{
    const hash=await bcrypt.hash(password,10);
    return hash;
}
userSchema.methods.verifyPassword = async function(password){
    const result= await bcrypt.compare(password,this.password);
    return result;
}

module.exports=model('User',userSchema);