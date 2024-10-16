import mongoose from "mongoose";

 const todoSchema= new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    dueDate:{
        type:Date,
        required:true,
        
    },
    isPending:{
       type:Boolean,
       default:false,
    }
})
  let Todo=mongoose.model("todo",todoSchema)
 
 export default Todo;