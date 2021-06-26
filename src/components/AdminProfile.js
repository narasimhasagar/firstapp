import React from 'react'
import ViewProducts from './ViewProducts'
import ProductForm from './ProductsForm'
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'

export default function AdminProfile(){
    return(

            <BrowserRouter>
                <div className="text-center">
                    <button type="submit" className="btn btn-success ms-3 mt-3">
                        <Link className="nav-link text-white" to="/addproduct">Add Products</Link>
                    </button>
                    <button type="submit" className="btn btn-info ms-5 mt-3">
                        <Link className="nav-link text-dark " to="/viewproduct">View Products</Link>
                    </button>
                 </div>

                <Switch>
                    <Route path="/addproduct">
                        <ProductForm/>
                    </Route>
                    <Route path="/viewproduct">
                        <ViewProducts/>
                    </Route>
                    <Route path="/">
                      <Redirect to="/addproduct" />
                    </Route>
                </Switch>
            </BrowserRouter>
    )
}