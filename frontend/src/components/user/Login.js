import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';import  {login} from "../../actions/userAction"
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Login = () => {
    let navigate = useNavigate();

    const [email,setemail] =  useState("")
    const [password,setpassword] = useState("")
    let dispatch = useDispatch()
    const {  isAuthenticated, error,loading} = useSelector(state => state.authUsers)
    console.log(isAuthenticated)

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/")

        }
    },[dispatch,isAuthenticated])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
  return (
    <Fragment>
        <ToastContainer position='top-center' />
    {loading ? <Loader /> : (
        <Fragment>
            <MetaData title={'Login'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>


        </Fragment>
    )}
</Fragment>

  )
}

export default Login