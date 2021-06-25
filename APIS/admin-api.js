//create express app
const exp=require('express')
const adminApi=exp.Router();//create mini express application
adminApi.use(exp.json())
const jwt=require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
 
 

adminApi.post("/login",expressAsyncHandler( async(req,res,next)=>{

    let admincollectionObj=req.app.get("adminCollectionObj")

    let credentials=req.body;

    

    
    //check for username
    let admin=await admincollectionObj.findOne({username:credentials.username})
    //if user not found
    if(admin===null)
    {
        res.send({message:"invalid username"})
    }
    else if(admin.password !== credentials.password)
        {
            res.send({message:"invalid password"})
    }
    else
        {
          //create and token
          let token=await jwt.sign({username:credentials.username},'abcdef',{expiresIn:120 })
          delete admin.password;
          res.send({message:'Login success',token:token,username:credentials.username})
 
        }
}))
 
module.exports=adminApi

