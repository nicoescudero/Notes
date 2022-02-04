const {Schema,model}=require('mongoose');
const noteSchema=new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports=model('Notes',noteSchema);