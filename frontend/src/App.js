import './App.css';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import Home from './components/products/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Prodcutdetails from './components/products/Prodcutdetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile  from './components/user/updateProfile';
import ProtectedRoutes from "../src/components/ProtectedRoutes"
import UpdatePassword from './components/user/updatePassword';
import ForgotPassword from './components/user/forgotPassword';
import NewPassword from './components/user/newPassword';
import Cart from "./components/cart/Cart"
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/Confirm';
import axios from 'axios'
import {useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import Payment from './components/cart/Payment';
// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { loadUser } from './actions/userAction';
import { useDispatch } from 'react-redux';
import OrderSuccess from './components/cart/OrderSuccess';
import Myorder from "../src/components/order/Myorder"
import OrderDetails from './components/order/Orderdetails';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/Productlist';
import NewProduct from './components/admin/Newproduct';
import UpdateProducts from './components/admin/Updateproducts';
import OrdersList from './components/admin/Orderlist';
import ProcessOrder from './components/admin/Proccessorder';

function App() {
  let dispatch = useDispatch()
  const [cookies, setCookie,removeCookie] = useCookies("token");
console.log(cookies)
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(()=>{
    dispatch(loadUser(cookies.token))
    
    async function getStripApiKey() {
      const { data } = await axios.get(`http://localhost:4000/api/v1/stripeapi/${cookies.token}`);
console.log(data.stripeApiKey)
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();
  })
  return (
    <BrowserRouter>

    <div className="App">
      {/* <Header /> */}
      <div className='container,container-fluid'>  
      <Routes>
     <Route path="/" element={<Home />}></Route>
     <Route path="/product/:id" element={<Prodcutdetails />}></Route>
     <Route path="/login" element={<Login />}></Route>
     <Route path="/register" element={<Register />}></Route>
     <Route path="/password/forgot" element={<ForgotPassword />}></Route>
     <Route  path="/password/reset/:token" element={<NewPassword/>}/>

     <Route  path='/me' element={<ProtectedRoutes/>}>
      <Route  path='/me' element={<Profile/>}/>
</Route>
<Route  path="/update/me" element={<ProtectedRoutes/>}>
<Route path="/update/me" element={<UpdateProfile />}></Route>

</Route>
<Route  path="/admin/update/:id" element={<ProtectedRoutes/>}>
<Route path="/admin/update/:id" element={<UpdateProducts />}></Route>

</Route>
<Route  path="/password/update" element={<ProtectedRoutes/>}>
<Route path="/password/update" element={<UpdatePassword />}></Route>

</Route>
<Route  path="/admin/products" element={<ProtectedRoutes/>}>
<Route path="/admin/products" element={<ProductsList />}></Route>

</Route>
<Route  path="/admin/new" element={<ProtectedRoutes/>}>
<Route path="/admin/new" element={<NewProduct />}></Route>

</Route>
<Route  path="/admin/order/update/:id" element={<ProtectedRoutes/>}>
<Route path="/admin/order/update/:id" element={<ProcessOrder />}></Route>

</Route>
<Route  path="/shipping" element={<ProtectedRoutes/>}>
<Route path="/shipping" element={<Shipping />}></Route>

</Route>
<Route  path="/admin/orders" element={<ProtectedRoutes/>}>
<Route path="/admin/orders" element={<OrdersList />}></Route>

</Route>
<Route  path="/confirm" element={<ProtectedRoutes/>}>
<Route path="/confirm" element={<ConfirmOrder />}></Route>

</Route>
{stripeApiKey &&
<Route  path="/payment" element={<ProtectedRoutes  />}>

<Route path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment  />  </Elements> }></Route>

</Route>          
          }

<Route  path="/cart" element={<ProtectedRoutes/>}>
<Route path="/cart" element={<Cart />}></Route>

</Route>
<Route  path="/success" element={<ProtectedRoutes/>}>
<Route path="/success" element={<OrderSuccess />}></Route>

</Route>
<Route  path="/orders/me" element={<ProtectedRoutes/>}>
<Route path="/orders/me" element={<Myorder />}></Route>

</Route>
<Route  path="/order/:id" element={<ProtectedRoutes/>}>
<Route path="/order/:id" element={<OrderDetails />}></Route>

</Route>
<Route  path="/dashboard" element={<ProtectedRoutes admin={true}/>}>
<Route path="/dashboard" element={<Dashboard />}></Route>

</Route>
      </Routes>
      </div>

      <Footer/>
     </div>
     </BrowserRouter>

  );
}

export default App;
