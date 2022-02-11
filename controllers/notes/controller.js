const Notes=require('./model');
const User=require('../user/model');

const controller={}

controller.createNote=async(req,res)=>{
    const {title,description} = req.body;
    const userId=req.params.id;
    const newNote=new Notes({title,description,userId});
    await newNote.save();
    const user=await User.findById(userId);
    user.notes.push(newNote);
    await user.save();
    if(!newNote && !user)return res.render('profile',{message:'Error ocurred, note not saved'});
    else return res.render('profile',{message:'note saved'});
}

controller.getAllNotes=async(req,res)=>{
    const notes=await Notes.find({userId:req.user.id});
    return res.render('notes',{notes});   
}

controller.editNote=async(req,res)=>{
    const id=req.params.id
    const note=await Notes.findById(id);
    return res.render('editNote',{note});
}

controller.updateNote=async(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    const note=await Notes.findById(id);
    note.title=title;
    note.description=description;
    await note.save();
    return res.redirect(`/notes/allNotes`);
}

controller.deleteNote=async(req,res)=>{
        const {id}=req.params
        const userId=req.user._id;
        try {
            await Notes.findByIdAndDelete(id);
            const user=await User.findById(userId);
            var index=user.notes.indexOf(id);
            await user.notes.splice(index, 1);
            await user.save();
            return res.redirect(`/notes/allNotes`);      
        } catch (error) {
            return res.redirect('/user/session');      
        }
}

module.exports = controller;