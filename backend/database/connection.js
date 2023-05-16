const mongoose=require("mongoose")

async function createConnection(params){
    const connection=await mongoose.connect(process.env.db_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    if(connection){
        console.log("connected database")
    }
}
module.exports={createConnection}