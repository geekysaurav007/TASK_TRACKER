const {Lists} =require("../models/list")
const joi=require("joi")
 

function validateTodolist(data){
    const schema=joi.object({
        title:joi.string().min(5).max(20).required(),
        description:joi.string().min(10).required(),
        user:joi.string().required()
    })
    const valid_result=schema.validate(data)
    return valid_result
}


// function to get lists of particular user------------------------------------->>>>>>>>>>>>>
async function getordersofUser(req,resp,next){
    const userId=req.params.id
    const result=await Lists.find({user:userId})
    if(!result){
        return next(new Error("not found"))
    }
    return resp.json(result)
}
// ----------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>

// get all list only accessible by an admin------------------------------>>>>>>>>>>>>>>>>>
async function getallList(req,resp,next){
    const result=await Lists.find()
    if(!result)
    {
        return next(new Error("no listss"))
    }
    return resp.json({result})
}
// --------------------------------------------------------------------------------->>>>>

// creating a todo list------------------------------------------------->>>>>>
async function CreateTODO(req,resp,next){
    const valid_result=validateTodolist(req.body)
    if(valid_result.error)
    {
        return next(new Error(valid_result.error.details[0].message))
    }
    let List=await Lists(valid_result.value).save()
    return resp.json({List})
}
// --------------------------------------------------------------------->>>>>>>>>>





module.exports={CreateTODO,getordersofUser,getallList}