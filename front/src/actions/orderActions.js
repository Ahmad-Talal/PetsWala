import axios from 'axios'
import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

} from '../constants/orderConstants'

import {CLEAR_CART} from '../constants/cartConstants'



export const placedOrder =(order) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:PLACE_ORDER_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.post(
        'http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/orders/add/',
        order,
        configuration
        )

    dispatch({
              type:PLACE_ORDER_SUCCESS,
              payload:data
            }) 
    
    dispatch({
        type:CLEAR_CART,
        payload:data
        }) 

       localStorage.removeItem('cartItems') 

        } catch(error)
        {   
            dispatch({type:PLACE_ORDER_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }   
        
}

export const getOrderDetails =(id) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:ORDER_DETAILS_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.get(
        `http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/orders/${id}/`,
        configuration
        )

    dispatch({
              type:ORDER_DETAILS_SUCCESS,
              payload:data
            }) 

        } catch(error)
        {   
            dispatch({type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }   
        
}


export const payOrder =(id) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:ORDER_PAY_REQUEST
    })

    const {
        userLogin :{userInfo} ,
          } = getState()

const configuration = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
}
// console.log(configuration)
const {data} =await axios.put(
        `http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/orders/${id}/pay/`,{},
        configuration
        )

    dispatch({
              type:ORDER_PAY_SUCCESS,
              payload:data
            }) 

        } catch(error)
        {   
            dispatch({type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }   
        
}

export const allOrdersList = () => async (dispatch,getState)=>{

    try{
    dispatch({
        type:ALL_ORDERS_REQUEST
    })

    const {
        userLogin :{userInfo} ,
          } = getState()

const configuration = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
}
const {data} =await axios.get(
        `http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/orders/all/`,
        configuration
        )

    dispatch({
              type:ALL_ORDERS_SUCCESS,
              payload:data
            }) 

        } catch(error)
        {   
            dispatch({type:ALL_ORDERS_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }   
        
}
