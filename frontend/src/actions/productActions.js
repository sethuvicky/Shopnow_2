import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ALL_PRODUCTS_FAIL,ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_REQUEST,CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_REQUEST,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST
} from "../constants/productConstants"



    export const getProducts = (currentPage,keyword="",price,category="All" )=> async (dispatch)=>{
        try {

            dispatch({type:ALL_PRODUCTS_REQUEST})
    
                let link 
            if(category==="All"){
                link = `/api/v1/products?page=${currentPage}`

            }else{
                link = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`

            }
            //   if(category){
        //       link = `http://localhost:4000/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${categor}`

        //   } 
          const {data} =  await axios.get(link)

          console.log(keyword)

            dispatch({
                type:ALL_PRODUCTS_SUCCESS,
                payload:data
            })

        } catch (error) {
            dispatch({
                type:ALL_PRODUCTS_FAIL,
                payload:error.response.data.message
            })
            toast.error("Server error ")          

            
        }
    }

    // Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const getPRoductdetails = (id)=> async (dispatch)=>{
    try {

        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
        toast.error("Server error ")          

        
    }
}

export const newReview = (reviewData,id) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review/${id}`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminProducts = (id) => async (dispatch) => {
    try {
        

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/products/${id}`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

//new product
export const newProduct = (productData,id) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/products/new/${id}`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
        toast.success("Added successfully")

    } catch (error) {
        // we can know which error we dealing with here with logging the issue
        console.log(error.response);
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
        toast.error("failed try again")

    }
}
// Delete product (Admin)
export const deleteProduct = (id,pro_id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/products/${id}?product=${pro_id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
        toast.success("Deleted successfully")


    } catch (error) {
        console.log(error.response)
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
        toast.error("failed try again")

    }
}
// Update Product (ADMIN)
export const updateProduct = (id,prod_id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/products/${id}?product=${prod_id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
        toast.success("updated successfully")          


    } catch (error) {
        console.log(error.response)
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
        toast.error("Server error ")          

    }
}
