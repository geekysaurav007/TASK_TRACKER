const express=require("express")
const { getordersofUser } = require("../controllers/todolist-controller")
const userRouter=express.Router()
const {saveUser,getallUsers,loginUsers,updateByUser, deleteMyList, getMyProfile}=require("../controllers/user-controller")
const { adminAuthMiddleware, userAuthMiddleware } = require("../mikddlewares/user-auth-middleware")




userRouter.post('/sign-up',saveUser)
userRouter.get('/my-profile/:id',getMyProfile)
userRouter.get("/all-users",adminAuthMiddleware,getallUsers)
userRouter.post('/login',loginUsers)
userRouter.get('/mylist/:id',userAuthMiddleware,getordersofUser)
userRouter.put('/:id/mylist-update',userAuthMiddleware,updateByUser)
userRouter.delete('/deletemylist/:id',userAuthMiddleware,deleteMyList)







module.exports={userRouter}