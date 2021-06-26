import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import Test from './components/Test'
//import Products from './components/Products'
import AdminProfile from './components/AdminProfile'
import './App.css';
import {useState} from 'react'

function App() {


  const [userLoginState, setUserLoginState] = useState(false)

  const onLogout = () => {
    localStorage.clear();
    setUserLoginState(false)
  }
  

  return (
   //Horizantal Nav_bar
   <BrowserRouter>
   <div className=" p-4">
    {/* <p>How are you</p> */}
     <ul className="nav bg-secondary  justify-content-end">
       <li className="nav-item">
         <Link className="nav-link text-white" to="/home">Home</Link>
       </li>
      
       <li className="nav-item">
         <Link className="nav-link text-white" to="/test">Test</Link>
       </li>
       
       <li className="nav-item">
         <Link className="nav-link text-white" to="/register">Register</Link>
       </li>

       {! userLoginState ?

       <li className="nav-item">
         <Link className="nav-link text-white" to="/login">Login</Link>
       </li> :
       <li className="nav-item">
         <Link className="nav-link text-white" to="/login" onClick={() => onLogout()}>Logout</Link>
       </li>
       
        }
     </ul>

     {/*switch */}
     <Switch>
        <Route path="/home">
          <Home />
        </Route>
        {/* <Route path="/products">
          <Products/>
        </Route> */}

        <Route path="/test">
          <Test/>
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login setUserStatus={setUserLoginState} />
        </Route>
        <Route path='/userprofile/:username'>
            <UserProfile/>
        </Route>

        <Route path='/adminprofile/:username'>
            <AdminProfile/>
        </Route>
        

        <Route path="/">
          <Redirect to="/home" />
        </Route>
     </Switch>
   </div>
   </BrowserRouter>
  );
}

export default App;
