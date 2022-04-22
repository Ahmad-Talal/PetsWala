import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {
        productListReducer,
        productDetailedReducer,
        productDeleteReducer
       } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer} from './reducers/userReducers'
import { 
            userRegisterReducer,
            userDetailsReducer,
            userUpdateReducer,
            userListReducer,
            userDeleteReducer,
            userGetReducer,
            userModifyReducer
       }     from './reducers/userReducers'
import {orderPlaceReducer,orderDetailsReducer,orderPayReducer,allOrdersReducer} from './reducers/orderReducers'

const reducer= combineReducers({
    productList:productListReducer,
    productDetail:productDetailedReducer,
    productDelete:productDeleteReducer,
    
    cart:cartReducer, 
    
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userGet:userGetReducer,
    userModify:userModifyReducer,

    orderPlace:orderPlaceReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    allOrders:allOrdersReducer,
})

const cartItemsFromStorage= localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [] 

const userInfoFromStorage= localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null  

const shippingAddressFromStorage= localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {} 
const paymentMethodFromStorage= localStorage.getItem('paymentMethod') ? 
JSON.parse(localStorage.getItem('paymentMethod')) : {}  

const initialState = {
    cart : { cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage, paymentMethod :paymentMethodFromStorage},
    userLogin : { userInfo: userInfoFromStorage}
}

const middleware=[thunk]

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store