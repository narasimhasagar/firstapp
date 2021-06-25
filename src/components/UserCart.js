import axios from 'axios'
import {useState,useEffect} from'react'


function UserCart(){

    const [cartObj,setCartObj]=useState('')

    useEffect(()=>{
        let username=localStorage.getItem("username")

        axios.get(`/user/getproducts/${username}`)
        .then(res=>{
            setCartObj(res.data.message)
        })
        .catch(err=>{
            console.log("Error in reading cart",err)
            alert("Something went wrong in getting cart")
        })
    },[])



    return(
        <div>
            <table className="table table-bordered text-center w-75 mx-auto mt-5">
                <thead>
                    <th>ProductName</th>
                    <th>Brand</th>
                    <th>Image</th> 
                </thead>
                <tbody>
                    {cartObj &&
                        cartObj.products.map((product,index)=>{
                            return <tr>
                                <td>{product.productname}</td>
                                <td>{product.Brand}</td>
                                <td>
                                    <img src={product.profileImage} width="60px" alt=""/> 
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
           

        </div>
    )
}

export default UserCart;