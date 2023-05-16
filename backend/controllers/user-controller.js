const { User } = require("../models/user")
const joi = require("joi")
const hashpassword = require("password-hash")
const jwt = require("jsonwebtoken")
const { Lists } = require("../models/list")
const { Error } = require("mongoose")

// function to check whether a email already exixts or not
async function findEmail(email) {
    const found_email = await User.findOne({ email: email })
    if (found_email) {
        console.log("fpound email.....from email function")
    }
    return (found_email) ? true : false
}
// function to validate user through joi----------------------------------------
function userValidate(data) {
    const joiSchema = joi.object({
        name: joi.string().required().min(4),
        email: joi.string().email().required(),
        password: joi.string().required().min(4).max(12),
        repassword: joi.string().required().min(4).max(12),
        phone: joi.string().required().min(10).max(11)
    })
    const valid_result = joiSchema.validate(data)
    return valid_result
}
// -----------------------------------------------------------------------------
// function to validate login user---------------------------->>>
function Loginvalidate(data) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(12).required()
    })
    const result = schema.validate(data)
    return result
}
// -------------------------------------------------------->>>>>

// function for sign-up--------------------------------------->

async function saveUser(req, resp, next) {
    const userdata = req.body
    const valid_result = userValidate(req.body)
    if (valid_result.error) {
        return next(new Error(valid_result.error.details[0].message))
    }

    const found = await findEmail(userdata.email)
    if (found) {
        return next(new Error("email alreday exists"))
    }
    if (userdata.password !== userdata.repassword) {
        return next(new Error("password not matched"))
    }

    userdata.password = hashpassword.generate(userdata.password)
    const result = await User(userdata).save()
    resp.json(result)
}
// --------------------------------------------------------------------------------------------------->>>
// function to get all the users----------->>>
async function getallUsers(req, resp) {
    const result = await User.find()
    return resp.json({ result })
}
// ----------------------------------------------->>>>>>>>>

// function to login------------------------------------->>>>
async function loginUsers(req, resp, next) {
    const valid_result = Loginvalidate(req.body)
    if (valid_result.error) {
        resp.status(400)
        return next(new Error(valid_result.error.details[0].message))
    }
    //object destructing from joi validation result
    const { email, password } = valid_result.value
    // finding the user by email
    const user = await User.findOne({ email: email })
    if (user) {
        var isPasswordMatched = hashpassword.verify(password, user.password)
        // checking password
        if (isPasswordMatched) {
            const payload = {
                _id: user._id,
                isAdmin: user.isAdmin,
                email: user.email
            }
            // creating jwt token
            const token = jwt.sign(payload, process.env.JWT_KEY)
            return resp.json({ message: "success", token })
        }
    }
    // this will run when email or password incorrect
    resp.status(400)
    
    return next(new Error("email or password wrong"))
}

// function to update title,description and status by a user provide id also--------------------------->>>>>>


async function updateByUser(req, resp, next) {
    const list_id = req.params.id
    const userschema = joi.object({
        title: joi.string().min(5).max(20),
        description: joi.string().min(10).max(200),
        status: joi.bool()
    })
    const valid_result = userschema.validate(req.body)
    if (valid_result.error) {
        return next(new Error(valid_result.error.details[0].message))
    }

    let my_list = await Lists.findOne({ _id: list_id })
    my_list = Object.assign(my_list, valid_result.value)
    my_list = await my_list.save()
    return resp.json({ my_list })
}
// -------------------------------------------------------------------------------->>>>>>>>>
// function to deletelists by a user---------------------------->>>>>>
async function deleteMyList(req, resp, next) {
    try {
        list_id = req.params.id
        const my_list = await Lists.deleteOne({ _id: list_id })
        resp.json({ my_list })
    } catch (error) {
        // return next(new Error("provided id is wrong"))
        err=error.message.split(' ')[6]
        return resp.json({err:`please check provided id ${err} it is wrong`})
        
        
    }

}
// ----------------------------------------------------------------------
async function getMyProfile(req,resp,next){
    const id=req.params.id
    const my_profile=await User.findOne({_id:id})
   const{name,email,phone,active}=my_profile
   return resp.json({name:name,email:email,phone:phone,active:active})
    
}
async function getmySinglelist(req,resp,next){
    const _id=req.params.id
    const my_list=await Lists.findOne({_id})
    return resp.json({my_list})
}




module.exports = { saveUser, getallUsers, loginUsers, updateByUser, deleteMyList,getMyProfile,getmySinglelist }
