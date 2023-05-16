const mongoose=require("mongoose")
const listSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:Boolean,default:false,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"users",required:true}
},
{timeStamps:{createdAt:"created_at",updatedAt:"updated_at"}}

)

const Lists=mongoose.model("lists",listSchema)
module.exports={Lists}