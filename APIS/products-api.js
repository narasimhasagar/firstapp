
//create express app
const exp=require('express')
const productApi=exp.Router();
const expressErrorHandler=require("express-async-handler");
const multerObj=require('./middlewares/fileUpload')


//install body parsse
productApi.use(exp.json())


///await get product
productApi.get("/getproduct",async(req,res,next)=>{

    let productcollectionObj=req.app.get("productCollectionObj")

    let productList=await productcollectionObj.find().toArray()
    res.send({message:productList})
})

//geproduct by name
productApi.get("/getproduct/:productname",async(req,res,next)=>{

    let productcollectionObj=req.app.get("productCollectionObj")

    let un=req.params.productname;
    let productObj=await productcollectionObj.findOne({productname:un})
    if(productObj===null){
        res.send({message:"no product found "})
    }
    else{
        res.send({message:productObj})
    }
})

//create
productApi.post("/createproduct",multerObj.single('photo'),expressErrorHandler( async (req,res,next)=>{
    
    let productcollectionObj=req.app.get("productCollectionObj")

    //get product obj 
    let newProduct=JSON.parse(req.body.productObj);
    let product=await productcollectionObj.findOne({productname:newProduct.productname})
    if(product===null){
        //add new property profileimage to newuser
        newProduct.profileImage=req.file.path;
        await productcollectionObj.insertOne(newProduct)
        res.send({message:"new product created"})
    }
}))

///upadate 
productApi.put("/updateproduct/:productname",expressErrorHandler( async  (req,res,next)=>{
   
    let productcollectionObj=req.app.get("productCollectionObj")
   
    let modifiedObj=req.body;
    let result=await productcollectionObj.updateOne({productname:modifiedObj.productname},{$set:{...modifiedObj}})
    console.log(result)
    res.send({message:'product updated'})
}))

//delete 
productApi.delete("/deleteproduct/:productname",(req,res,next)=>{

    let productcollectionObj=req.app.get("productCollectionObj")

    
   let productName=req.params.productname
   productcollectionObj.deleteOne({productname:productName})
    .then(res.send({message:"product deleted"}))
    .catch(err=>{
        console.log(err)
        res.send({message:err.message})
    })
})

//export
module.exports=productApi;


