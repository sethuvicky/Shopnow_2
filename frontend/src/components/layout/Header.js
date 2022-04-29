// import { Fragment, useState } from 'react'
// import {useDispatch,useSelector} from "react-redux"
// import {getProducts} from "../../actions/productActions"
// const Header = () => {
//   const dispatch = useDispatch()

//   let [keyword,setvalue]= useState("")
//   let searchHandler = (e)=>{
//     e.preventDefault()
//     dispatch(getProducts(keyword))

//   }
//   return (
// <Fragment>
// <nav className="navbar row">
//         <div className="col-12 col-md-3">
//           <div className="navbar-brand">
//             <img src="./images/logo.png" />
//           </div>
//         </div>
//   <form className="col-12 col-md-6 mt-2 mt-md-0" onSubmit={searchHandler}>
//   <div >
//           <div className="input-group">
//             <input onChange={(e)=>(setvalue(e.target.value))} type="text" id="search_field" className="form-control" placeholder="Enter Product Name ..." />
//             <div className="input-group-append">
//               <button id="search_btn" className="btn">
//                 <i className="fa fa-search" aria-hidden="true" />
//               </button>
//             </div>
//           </div>
//         </div>
//   </form>
//         <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//           <button className="btn" id="login_btn">Login</button>
//           <span id="cart" className="ml-3">Cart</span>
//           <span className="ml-1" id="cart_count">2</span>
//         </div>
//       </nav>

    
// </Fragment>
//     )
// }

// export default Header