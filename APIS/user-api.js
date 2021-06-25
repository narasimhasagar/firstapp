//create mini express app
const exp=require('express');
const userApi=exp.Router();
const expressErrorHandler=require("express-async-handler");
const checkToken=require("./middlewares/verifyToken");
const bcryptjs= require('bcryptjs')
const jwt=require("jsonwebtoken")
const multerObj=require("./middlewares/fileUpload")


//body parsing middleware
userApi.use(exp.json())


//get users using ASYNC AND AWAIT-------------------------------------------------------------

userApi.get("/getusers",expressErrorHandler( async ( req, res, next )=>{
     
    let userCollectionObj=req.app.get("userCollectionObj")

    let userList=await userCollectionObj.find().toArray()
    res.send({message:userList})
}))

//get user by username using ASYNC AND AWAIT-----
userApi.get("/getuser/:username", expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    let un=req.params.username;
    let userObj=await userCollectionObj.findOne({username:un})
    if(userObj===null){
        res.send({message:"No user found"})
    }
    else{
        res.send({message:userObj})
    }
}))

//create user using ASYNC AND AWAIT--------------------------------------------
userApi.post("/createuser",multerObj.single('photo'), expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    //get user obj
    let newUser = JSON.parse(req.body.userObj);

    //getuser
    //let newUser=req.body;
    //search for user
    let user= await userCollectionObj.findOne({username:newUser.username})

    //if user is null
    if(user===null){

        //hash the password
        let hashedPw=await bcryptjs.hash(newUser.password,7)
        //replace the plain password with hashed password
        newUser.password=hashedPw;

        //add new property profileimage to newuser
        newUser.profileImage=req.file.path;

        //create user
        await userCollectionObj.insertOne(newUser)
        res.send({message:"New user created"})
    }
    else{
        res.send({message:"User already existed"})
    }
}))

//update user using ASYNC AND AWAIT-----------------------------------------
userApi.put("/updateuser/:username", expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    //get modified obj
    let modifiedUser=req.body;

     //hash the password
     let hashedPw=await bcryptjs.hash(modifiedUser.password,7)
     //replace the plain password with hashed password
     modifiedUser.password=hashedPw;

    await userCollectionObj.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})

    res.send({message:"User updated"})
}))

//delete username using ASYNC AND AWAIT------------------------------------------------------
userApi.delete("/deleteuser/:username", expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    let un=req.params.username;
    //delete
    let user=await userCollectionObj.findOne({username:un})
    if(user===null){
        res.send({message:"User not existed to delete"})
    }
    else{
        await userCollectionObj.deleteOne({username:un})
        res.send({message:"User deleted"})
    }
}))


//user login
userApi.post("/login", expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    //get user  credentials
    let credentials=req.body;

    //check for username
    let user=await userCollectionObj.findOne({username:credentials.username})

    //if user not found
    if(user===null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare passwords
        let status =await bcryptjs.compare(credentials.password, user.password)
        console.log("status is",status)
        //if password not matched
        if(status===false){
            res.send({message:"Invalid Password"})
        }
        else{
            //create and send token
            let token= await jwt.sign({username:credentials.username},process.env.SECRET_KEY,{expiresIn: 10 })
            //send token to client
            res.send({message:"Login success",token:token,username:credentials.username})
        }
    }
}))


//add to cart
userApi.post("/addtocart",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("usercartCollectionObj")

    //get user cart obj
    let userCartObj=req.body;

    //find user in usercartcollection
    let userInCart=await userCartCollectionObj.findOne({username:userCartObj.username})

    //if user not existed in cart
    if(userInCart===null){
        //new usercartObj
        let products=[];
        products.push(userCartObj.productObj)
        let newUserCartObj={username:userCartObj.username,products:products};

        //console.log(newUserCartObj)
        //insert
        await userCartCollectionObj.insertOne(newUserCartObj)
        res.send({message:"Product added to cart"})
    }
    //if user already existed in cart
    else{
        userInCart.products.push(userCartObj.productObj)
        //update
        await userCartCollectionObj.updateOne({username:userCartObj.username},{$set:{...userInCart}})
        res.send({message:"Product is added to cart"})
    }
}))


//get products for add to cart
userApi.get("/getproducts/:username",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("usercartCollectionObj")

    let un=req.params.username;
    let cartObj=await userCartCollectionObj.findOne({username:un})
    res.send({message:cartObj})
}))



//testing route
userApi.get('/testing', checkToken, (req,res,next)=>{

    res.send({message:"Private Data"})
})

//export
module.exports=userApi;
