import React from 'react'
//import Item from './Item'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"

 

function ViewProducts() {

    let history=useHistory();

    let[products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(`/product/getproduct`)
        .then(res=>{
            let productObj=res.data
            setProducts([...productObj.message])
     
        })
    },[])
    console.log(products)


     //function to add post product to usercart api
    const addProductToCart=(productObj)=>{
        //get username from Local storage
        let username=localStorage.getItem("username")

        // add username to product object
        let newObj={username,productObj}

        console.log("product added by user",newObj)  
        //make post request
        axios.post("/user/addtocart",newObj)
             .then(res =>{
                 let responseObj = res.data
                 alert(responseObj.message)

                 history.push("/UserCart")
             })
             .catch(err =>{
                 console.log("err in adding to cart",err)
                 alert("something went wrong")
             })
    }



    let usertype=localStorage.getItem("username")



    
    return (

        <div class=" row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {products &&
                products.map((product,index)=>{
                    return(
                        <div class="col" key={index}>
                            <img src={product.profileImage} class="card-img-top" alt=" " />
                            <div className="card-body bg-light text-start">
                                <h5 class="card-title">ProductName:{product.productname}</h5>
                                <p class="card-text">Price :Rs.{product.price}</p>
                                <p class="card-text">Brand :{product.Brand}</p>

                                {usertype!="admin" && 
                                <div className="d-flex float-end">
                                    <button className="btn btn-primary float-end" onClick={()=>addProductToCart(product)} >Add to cart</button> 

                                </div>
                                ||
                                <div className="d-flex float-end">
                                    <button className="btn btn-primary float-end" /*onClick={()=>addProductToCart(product)} */>Edit</button> 
                                    <button className="btn btn-primary float-end" /*onClick={()=>addProductToCart(product)} */>Delete</button> 

                                </div>
                                }

                               
                                
                            </div>
                        </div>
                    )
                })

               
            }

        </div>


    )
}

export default ViewProducts
