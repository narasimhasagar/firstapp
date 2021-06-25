import axios from 'axios';
import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'

export default function Register(){
    let {register,handleSubmit,formState:{errors}}=useForm();

    const [file,setFile] = useState(null)

    let history=useHistory();
    //console.log(history)
    
    //when foem is submitted
    const onFormSubmit=(userObj)=>{

        //create Formdata object
        let formData=new FormData();
        //add image to formData Obj
        formData.append('photo',file,file.name)
        //add userobj to fromData Obj
        formData.append("userObj",JSON.stringify(userObj))

        //pass it to the user api by making http post req
        axios.post('/user/createuser',formData)
              .then(res=>{
                  alert(res.data.message)

                  history.push('/login')
              })

    //    // pass it to userApi  by making http post request
    //     axios.post('/user/createuser',userObj)
    //     .then(res=>{
    //         console.log(res.data)
    //         alert(res.data.message)

    //         history.push('/login')
    //     })
        
    }
    //when file is selected
    const onFileSelect=(event)=>{

       setFile( event.target.files[0])
    
    }

    return(
        <div>
            <h1 className="text-center text-warning mt-4">Register Here..</h1>
            <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
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

            {/* email */}
            <label htmlFor="e">Email</label>
            <input type="mail" id="e" {...register('mail',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.mail && <p className="text-danger">*Enter email</p>}


            {/* Date of birth */}
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" {...register('dob',{required:true})} className="form-control mb-3" />
            {/* dob validation */}
            {errors.dob && <p className="text-danger">*Give Date of Birth</p>}
           
            {/* file  */}
            <input type="file" name="photo" className="form-control md-3" onChange={(e=>onFileSelect(e))}/>

        

            <button type="submit" className="btn btn-success">Register</button>
        </form>
        </div>
    )

}
