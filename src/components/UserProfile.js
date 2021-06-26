import axios from 'axios';
import  { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import ViewProducts from './ViewProducts';
import UserCart from './UserCart';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'



 
export default function UserProfile(){  


    //const getCount=0;



    

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
                        <Link className="nav-link text-dark " to="/usercart">
                            Cart
                            <span className="badge bg-warning taxt-dark">{0}</span>
                            </Link>
                    </button>
                 </div>

                <Switch>
                    <Route path="/products">
                        <ViewProducts/>
                    </Route>
                    <Route path="/usercart">
                        <UserCart/>
                    </Route>
                    <Route path="/">
                        <Redirect to ="/products" />
                    </Route>
                
                    
                </Switch>
            </BrowserRouter>

            
        </div>
    )
}


