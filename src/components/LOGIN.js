import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios';

export default function Login(props){
    let {register,handleSubmit,formState:{errors}}=useForm();

    let history=useHistory();
    //console.log(history)

    const onFormSubmit=(credentials)=>{
         // console.log(credentials)
           axios.post(`/${credentials.type}/login`,credentials)
           .then(res=>{
               let responseObj=res.data;


              if(responseObj.message==='Login success')
              {
                   //save token to browsers local memory
               localStorage.setItem("token",responseObj.token)
               localStorage.setItem("user",JSON.stringify( responseObj.userobj))
               localStorage.setItem("username",responseObj.username)
               

              //update state
               props. setUserStatus(true)

               if(credentials.type==='user'){
                   //redirect to user profile page
                   history.push(`/userprofile/${responseObj.username}`)
               }
               if(credentials.type==='admin'){
                //redirect to user profile page
                history.push(`/adminprofile/${responseObj.username}`)
               }

              }
              else
              {
                   alert(responseObj.message)
              }
           })   
    }

    return(
        <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>

              
            {/* admin/user */}
            
                <div className="form-check form-check-inline">
                  <input type="radio" name="flexRadioDefault" id="admin" className="form-check-input" value="admin" {...register("type")}   />
                  <label class="form-check-label">Admin</label>
                </div>
                <div className="form-check form-check-inline">
                   <input type="radio" name="flexRadioDefault" id="user" className="form-check-input" value="user" {...register("type")}/>
                   <label class="form-check-label">User</label>
                </div>
                {errors.usertype?.type==='required' && <p className="text-danger">*Please select user type</p>}
               <br />

            {/* username */}
            <label htmlFor="un" className="mt-5">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3" />
            {/*username validation */}
            {errors.username?.type=== 'required' && <p className="text-danger">*Username is required</p>}
            {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}


            {/* password */}
            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.password && <p className="text-danger">*Password is required</p>}


            <button type="submit" className="btn btn-warning">Login</button>
        </form>
    )
}


