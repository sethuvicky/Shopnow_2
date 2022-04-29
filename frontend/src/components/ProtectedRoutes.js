import {Routes,Route,Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"
import Profile from "../components/user/Profile"
import { useCookies } from "react-cookie";

let Privateroute = ({admin})=>{
    console.log(admin)
    const [cookies, setCookie,removeCookie] = useCookies("token");
    const   {user}  = useSelector(state => state.authUsers)
    // console.log(user.role)
    // admin && admin == true && user && user.role == 'user' ?
    //     <Navigate to="/" /> : <Outlet />
    return cookies.token ?    <Outlet/> 
:<Navigate to="/login" />
}

    // let token = login.state.token
//  let data = JSON.parse(login)




export default Privateroute