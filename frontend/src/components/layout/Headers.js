import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useCookies } from "react-cookie";
import { loadUser,logout } from '../../actions/userAction';
import { useEffect } from 'react';

const Headers = () => {
    const {cartItems}  = useSelector(state => state.Cart)

    // const cart =JSON.parse(localStorage.getItem('cartItems'))

    const   {user}  = useSelector(state => state.authUsers)
    const { loading, products, error, productsCount, resPerpage, filteredProductsCount } = useSelector(state => state.products)

    const [cookies, setCookie,removeCookie] = useCookies("token");
    const dispatch = useDispatch()

    useEffect(()=>{
        if(cookies.token){
          
       dispatch(loadUser(cookies.token))
      }
      },[cookies])
      const logoutHandler = () => {
        removeCookie("token");
      
        dispatch(logout());
      
      }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark ">
    <Link class="navbar-brand" to="/">Shop now</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
     
 
    </ul>
    
  </div>
  { cartItems && <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>}
  {user && user.name ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user &&  user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link onClick={logoutHandler} className="dropdown-item text-danger" to="/" >
                                    Logout
                                </Link>

                            </div>
                            


                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
 
  
  </nav>  )
}

export default Headers