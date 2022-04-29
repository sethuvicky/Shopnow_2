import { ADDTO_CART,REMOVE_ITEM_CART } from "../constants/cartConstants";
let cart = JSON.parse(localStorage.getItem("cartItems"))
let shipping = JSON.parse(localStorage.getItem("shippingInfo"))

export const addtoCart = (state = { cartItems: [], shippingInfo: shipping }, action) => {
    switch (action.type) {

        case ADDTO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

            case REMOVE_ITEM_CART:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(i => i.product !== action.payload)
                }



    


        default:
            return state
    }
}