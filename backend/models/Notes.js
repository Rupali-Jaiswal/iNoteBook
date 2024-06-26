const mongoose=require('mongoose')

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Note=mongoose.model('Note',notesSchema)
Note.createIndexes()
module.exports=Note