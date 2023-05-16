const express=require("express")
const listRouter=express.Router()
const {CreateTODO, getordersofUser,getallList}=require("../controllers/todolist-controller")
const { userAuthMiddleware, adminAuthMiddleware } = require("../mikddlewares/user-auth-middleware")
const { getmySinglelist } = require("../controllers/user-controller")

listRouter.post('/create',userAuthMiddleware,CreateTODO)

listRouter.get('/getlist',adminAuthMiddleware,getallList)
listRouter.get('/getmylist/:id',userAuthMiddleware,getmySinglelist)





module.exports={listRouter}