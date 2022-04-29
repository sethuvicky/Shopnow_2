import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useCookies } from "react-cookie";

import { useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import React  from 'react'
import { Fragment } from "react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Dashboard = () => {
    let navigate = useNavigate()
    const [cookies, setCookie,removeCookie] = useCookies("token");

    const   {user}  = useSelector(state => state.authUsers)

useEffect(()=>{
     if(user  && user.role == "user"){
         console.log(user)
         navigate("/")
     }

},)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAdminProducts(cookies.token))

    },[])
    const { loading, products, error, productsCount, resPerpage, filteredProductsCount } = useSelector(state => state.products)
    const state = useSelector(state => state.products)
products && console.log(products);
    let outOfStock = 0;
  products &&  products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
 return (
<Fragment>
<Sidebar />

<div className="row" >

    
   {  loading && loading ? <Loader />
   
   :<div className="col-12 col-md-12">
        <h1 className="my-4">Dashboard</h1>
        {products &&  <><div className="row pr-4">
                         <div className="col-xl-12 col-sm-12 mb-3">
                             <div className="card text-white bg-primary o-hidden h-100">
                                 <div className="card-body">
                                     <div className="text-center card-font-size">Total Amount<br /> <b>$4567</b>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div><div className="row pr-4">
                             <div className="col-xl-3 col-sm-6 mb-3">
                                 <div className="card text-white bg-success o-hidden h-100">
                                     <div className="card-body">
                                         <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                     </div>
                                     <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                         <span className="float-left">View Details</span>
                                         <span className="float-right">
                                             <i className="fa fa-angle-right" />
                                         </span>
                                         </Link>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 mb-3">
                                 <div className="card text-white bg-danger o-hidden h-100">
                                     <div className="card-body">
                                         <div className="text-center card-font-size">Orders<br /> <b>125</b></div>
                                     </div>
                                     <Link className="card-footer text-white clearfix small z-1" to="/admin/orders" >
                                     <span className="float-left">View Details</span>
                                     <span className="float-right">
                                         <i className="fa fa-angle-right" />
                                     </span>
                                     </Link>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 mb-3">
                                 <div className="card text-white bg-info o-hidden h-100">
                                     <div className="card-body">
                                         <div className="text-center card-font-size">Users<br /> <b>45</b></div>
                                     </div>
                                     <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                         <span className="float-left">View Details</span> 
                                         <span className="float-right">
                                             <i className="fa fa-angle-right" />
                                         </span>
                                         </Link>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 mb-3">
                                 <div className="card text-white bg-warning o-hidden h-100">
                                     <div className="card-body">
                                         <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                     </div>
                                 </div>
                             </div>
                         </div></>  }

      </div>
}
</div>

</Fragment>
  )
}

export default Dashboard