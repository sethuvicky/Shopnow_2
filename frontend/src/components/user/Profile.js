import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useCookies } from "react-cookie";
import { loadUser } from '../../actions/userAction'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Headers from '../layout/Headers'
const Profile = () => {
    let dispatch = useDispatch()

    
    const { user, loading } = useSelector(state => state.authUsers)
    return (
        <Fragment>
            <Fragment>
                    <Headers />
                    <MetaData title={'Your Profile'} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    {user && user.avatar ? <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3 text-center">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/update/me" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div> :<Loader /> 
                    }
                </Fragment>
        </Fragment>
    )
}

export default Profile