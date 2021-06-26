//creating express app
const exp= require('express')
const app=exp();
const path = require("path")
require('dotenv').config()

//connect front end backend
app.use(exp.static(path.join(__dirname, './build/')))

//import apis
const userApi=require("./APIS/user-api")
const ProductApi=require("./APIS/products-api")
const adminApi=require("./APIS/admin-api")

//evaluate path to execute specific api
app.use("/user",userApi)
app.use("/product", ProductApi)
app.use("/admin",adminApi)

//const productApi=require("./APIS/product-api")
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
        if (err) {
              res.status(500).send(err)
        }
    })
})



//get mongo client
const mc=require("mongodb").MongoClient;

//database url
const databaseUrl=process.env.DATABASE_URL


//const databaseUrl="mongodb://myfirst:myfirst@cluster0-shard-00-00.dg2im.mongodb.net:27017,cluster0-shard-00-01.dg2im.mongodb.net:27017,cluster0-shard-00-02.dg2im.mongodb.net:27017/myfirst?ssl=true&replicaSet=atlas-8h5baa-shard-0&authSource=admin&retryWrites=true&w=majority"




//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{

    
    if(err){
        console.log("Error in the db connection",err)
    }
    else{
        //get database object
        databaseObj = client.db("myfirst")

        //create collection Obj
        let userCollectionObj=databaseObj.collection("usercollection")
        let adminCollectionObj=databaseObj.collection("admincollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let usercartCollectionObj=databaseObj.collection("usercartcollection")


        //sharing collection objects to APIS
        app.set("userCollectionObj",userCollectionObj)
        app.set("adminCollectionObj",adminCollectionObj)
        app.set("productCollectionObj",productCollectionObj) 
        app.set("usercartCollectionObj",usercartCollectionObj)


        console.log("Database connected")
    }
})




//handling unavailble paths
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not matched`})
})

//error handling middleware(for syntax errors)
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})


//app.use("/products",productApi)

//assign port
//const port=8080
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`server running on port ${port} `))

