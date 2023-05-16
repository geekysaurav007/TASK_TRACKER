const { timeStamp } = require("console")
const { string } = require("joi")
const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    password:{type:String,required:true},
    repassword:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    active:{type:Boolean,required:true,default:true},
    phone:{type:String}
},{timeStamps:{createdAt:"created_at",updatedAt:"updated_at"}})


userSchema.statics.isExists=async function isExists(email){
    const result=await this.findOne({email:email})
    return (result)?true:false
}
const User=mongoose.model("users",userSchema)
module.exports={User}
