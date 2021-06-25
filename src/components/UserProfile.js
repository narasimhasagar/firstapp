import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import ViewProducts from './ViewProducts';
import UserCart from './UserCart';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'


 
export default function UserProfile(){

    //function to add post product to usercart api
    // const addProductToCart=()=>{
    //     //get username from Local storage
    //     let username=localStorage.getItem("username")
    //     // add username to product object
    //     let newObj={username,productObj}

    //     console.log("product added by user",newObj)
    //     //make post request
    //     axios.post("/user/addtocart",newObj)
    //          .then(res =>{
    //              let responseObj = res.data
    //              alert(responseObj.message)
    //          })
    //          .catch(err =>{
    //              console.log("err in adding to cart",err)
    //              alert("something went wrong")
    //          })
    // }

    let params=useParams();
    let [userObj,setUserObj]=useState({})

    let history=useHistory();
    //console.log(history)

    useEffect(()=>{
        axios.get(`/user/getuser/${username}`)
        .then(res=>{
            userObj=res.data;
            setUserObj({...userObj.message})
        })

    },[])


    let username=params.username;
    console.log("userObj is",userObj)


    return(
        <div className="text-center">
            <h1 className="text-warning text-end">Welcome , {username}
             <img src={userObj.profileImage} width="80px" alt="" /> </h1>
            <div className="text-white">

                <h2>{userObj.mail}</h2>
                <h2>{userObj.dob}</h2>

            </div>
            <BrowserRouter>
                <div className="text-center">
                    <button type="submit" className="btn btn-success ms-3 mt-3">
                        <Link className="nav-link text-white" to="/products">Products</Link>
                    </button>
                    <button type="submit" className="btn btn-info ms-5 mt-3">
                        <Link className="nav-link text-dark " to="/usercart">UserCart</Link>
                    </button>
                 </div>

                <Switch>
                    <Route path="/products">
                        <ViewProducts/>
                    </Route>
                    <Route path="/usercart">
                        <UserCart/>
                    </Route>
                </Switch>
            </BrowserRouter>

            
        </div>
    )
}


