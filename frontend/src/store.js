import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productsReducer,productDetailsReducer } from "./reducers/productReducers"
import { authReducer ,userReducer} from "./reducers/userReducers"
import { addtoCart } from "./reducers/cartReducer"
import { newOrderReducer ,myOrdersReducer,orderDetailsReducer,allOrdersReducer} from "./reducers/orderReducer"
const reducer  = combineReducers({
    products:productsReducer,
    productsdetails:productDetailsReducer,
    authUsers : authReducer,
    user: userReducer,
    Cart : addtoCart,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails:orderDetailsReducer,
    allorders:allOrdersReducer


})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const  middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;