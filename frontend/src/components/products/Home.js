import React, { Fragment ,useEffect,useState} from 'react'
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from "react-redux"

import { getProducts,getAdminProducts } from '../../actions/productActions'
import Loader from '../layout/Loader'
import Productcard from './Productcard'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { loadUser, logout } from '../../actions/userAction'
import { useCookies } from "react-cookie";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)
const Home = () => {
  let [keyword,setvalue]= useState("")
  const {cartItems}  = useSelector(state => state.Cart)
  let  cart = JSON.parse(localStorage.getItem('cartItems'))

  const [currentPage, setCurrentPage] = useState(1)
  const [price ,setprice] =useState([1,1000])
  function setCurrentPageNo(pageNumber) {
    console.log(pageNumber)
    setCurrentPage(pageNumber)
}
const [category, setCategory] = useState('All')
const [cookies, setCookie,removeCookie] = useCookies("token");
// const [items,setitems]= useState([])
const { loading, products, error, productsCount, resPerpage, filteredProductsCount } = useSelector(state => state.products)

const   {user}  = useSelector(state => state.authUsers)
const dispatch = useDispatch()
console.log(resPerpage)

console.log(products)

    useEffect(()=>{
        dispatch(getProducts(currentPage,keyword,price,category))
        // dispatch(getAdminProducts(cookies.token))
    
    },[dispatch,currentPage,keyword,price,category,user])
useEffect(()=>{
  if(cookies.token){
    
 dispatch(loadUser(cookies.token))

}
},[cookies])
const logoutHandler = () => {
  removeCookie("token");

  dispatch(logout());

}
    const categories = [
      'Electronics',
      'Cameras',
      'Laptops',
      'Accessories',
      'Headphones',
      'Food',
      "Books",
      'Clothes/Shoes',
      'Beauty/Health',
      'Sports',
      'Outdoor',
      'Home'
  ]
  // const [selectedClient,setSelectedClient] = useState([]);

//   function handleSelectChange(event) {
//     setSelectedClient(event.target.value);
//     console.log(selectedClient)
// }


    return (
      <Fragment>    <ToastContainer position='top-center' />
      
      <nav class="navbar navbar-expand-lg navbar-dark ">
  <a class="navbar-brand" href="#">Shop nows</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown" >
      
        <select style={{margin:"10px" ,backgroundColor:"#232F3E",color:"white",border:"none"}} className="form-select" onChange={(e)=>(setCategory(e.target.value))}> //set value here
            <option value="All">          categories </option>
            <option value="Electronics">Electronics</option>
            <option value="Cameras">Cameras</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
            <option value="Headphones">Headphones</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Clothes/Shoes">Clothes/Shoes</option>
            <option value="Beauty/Health">Beauty/Health</option>
            <option value="Cameras">Sports</option>
            <option value="Outdoor">Outdoor</option>
        </select>
      </li>
 
    </ul>
    <form class="form-inline my-2 my-lg-0" style={{width:"400px"}}>
    <div className="input-group">
            <input onChange={(e)=>(setvalue(e.target.value))} type="text" id="search_field" className="form-control" placeholder="Enter Product Name ..." />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>      </form>
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
</nav>
     


          <MetaData title={"Buy latest product low price "} />

            <section id="products" className="container mt-5">
            <div style={{width:"400px"}} className='col-4,col-md-3'>
              {keyword && <div className='px-5'>
              <h3 className='text-center'>Filter</h3>
              <p>BUDGET</p>
              <p>choose below range</p>


    <Range
    style={{marginTop:"60px"}}
    marks={{
      1:"$1",
      1000:"$1000"
    }}
    min={1}
    max={1000}
    defaultValue={[1,1000]}
    tipformatter={value => `$ ${value}`}
    tipProps={{
      placement:"top",
      visible:true
    }}
    value={price}
    onChange={price => setprice(price)}
    />
  </div> }
 
</div>
          { loading ? <Loader />
        :
        <div>

<h1 id="products_heading">Latest Products</h1>

        <div className="row">

        <Fragment>

{products &&  products.map(product =>(
       
           <Productcard product={product} />
        ))}
          
        </Fragment>  
        </div>
        </div>

        }
          {   productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={4}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
      </section>
      </Fragment>

   )
}

export default Home