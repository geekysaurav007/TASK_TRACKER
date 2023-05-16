const express=require("express")
const {createConnection}=require("./database/connection")
const {handleError} =require("./mikddlewares/errorhandle")
const {userRouter}=require("./routers/user-router")
const app=express()
require('express-async-errors')
app.use(express.json())
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200} 
var cors=require('cors')
app.use(cors(corsOptions))
require("dotenv").config()
const morgan =require("morgan")
const { listRouter } = require("./routers/list-router")
app.use(morgan("dev"))


// listening on port 5000
app.listen(3000,()=>{
    console.log("hello....i am working on 3000 port")
})
// ------------------------------------------------------
createConnection() //creating database connection
// -----------------------------------------------------------


const apiRouter=express.Router()
app.use('/api',apiRouter)  //default api in making ->>>>> localhost:3000//api/
// -------------------------------------------------------------------------------


apiRouter.get('',(req,resp)=>{
    resp.json("hello there...")
})

apiRouter.use('/user',userRouter)
apiRouter.use('/lists',listRouter)


app.use(handleError)