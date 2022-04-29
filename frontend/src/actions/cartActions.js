import { ADDTO_CART,REMOVE_ITEM_CART,SAVE_SHIPPING_INFO } from "../constants/cartConstants"
import axios from "axios"

//add to cart
export const addtoCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
        type: ADDTO_CART,
        payload: {
            product: data.item._id,
            name: data.item.name,
            price: data.item.price,
            image: data.item.images[0].url,
            stock: data.item.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}