import axios from 'axios';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const addToCart = (id,qty) => async (dispatch, getState ) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
    //console.log("aagaya idher bhii",id,qty,data._id,data.name,data.price)
    
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data._id,
            name: data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
     })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))    
}        

export const removeFromCart = (id) => async (dispatch, getState ) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
    
    
    dispatch({
        type:REMOVE_FROM_CART,
        payload:data._id
     })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))    
}        

export const shipping = (data) => async (dispatch ) => {    
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:data
     })

    localStorage.setItem('shippingAddress', JSON.stringify(data))    
}   

export const payment= (data) => async (dispatch ) => {    
    dispatch({
        type:SAVE_PAYMENT_METHOD,
        payload:data
     })

    localStorage.setItem('paymentMethod', JSON.stringify(data))    
}   