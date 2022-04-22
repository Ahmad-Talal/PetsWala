import React, {useEffect} from 'react'
import {ListGroup,ListGroupItem,Card,Button,Col,Row,Image} from 'react-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import Checkouts from '../Checkouts'
import Message from '../components/Message'
import {placedOrder} from '../actions/orderActions'
import {ORDER_RESET} from '../constants/orderConstants'

const PlaceOrderScreen = ({history})=> {
    const orderPlace = useSelector(state=>state.orderPlace)
    const {order,error,success} = orderPlace

    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)

    cart.itemsPrice = cart.cartItems.reduce((sum,val) => 
    sum + val.price*val.qty,0).toFixed(2)
    
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)

    cart.taxPrice = (0.082 * cart.itemsPrice).toFixed(2)
    
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)
     + Number(cart.taxPrice)).toFixed(2)
    
     const object ={
         orderItems: cart.cartItems,
         shippingAddress:cart.shippingAddress,
         paymentMethod:cart.paymentMethod,
         itemsPrice:cart.itemsPrice,
         shippingPrice:cart.shippingPrice,
         taxPrice:cart.taxPrice,
         totalPrice:cart.totalPrice
     }

    if(!cart.paymentMethod)
    {
        history.push('/payment')
    }
    
    useEffect(() => {
        
            if(success){
            history.push(`/order/${order._id}`)
           
            dispatch({
                type:ORDER_RESET
            })}
             
    }, [success,history,order,dispatch])


    const Place=()=>{

        dispatch(placedOrder(object))            
    }


    return (
        <div>
        <Checkouts s1 s2 s3 s4/>

        <Row>
            <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Shipping: </strong>
                        {cart.shippingAddress.address}{' '},
                        {cart.shippingAddress.postalCode}{' '},
                        {cart.shippingAddress.city}{' '},
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}{' '}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    <ListGroup variant ='flush'>
                {
                    cart.cartItems.length === 0 ?
                    <Message variant = 'dark'>Your cart is empty</Message>:(
                    
                cart.cartItems.map((val,index)=>
                {
                return(
                <ListGroupItem key={index}>
                    <Row>
                        <Col md={2}>
                        <Image src={val.image} alt={val.name} fluid/>
                        </Col>

                        <Col md={6}>
                            <p><strong>{val.name}</strong></p>
                        </Col>
                        
                        <Col md={4}>
                            <p>{val.qty}{" "}X{" "}{val.price}{" = $"}
                            {val.qty*val.price}
                            </p>
                        </Col>

                    </Row>
                </ListGroupItem> 
                )
                })
                )
                }
                </ListGroup>
                </ListGroup.Item>

            </ListGroup>  
            </Col>

            <Col md={4}>
                <Card>
                    <h2 style={{textAlign:'center'}}>Order Summary</h2>
                    { cart.cartItems.length === 0 ? 
                    <Message variant = 'dark'>Your cart is empty</Message> 
                    : <ListGroup vaiant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Items:</h> 
                                </Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Shipping:</h> 
                                </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Tax:</h> 
                                </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Total:</h> 
                                </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    
                        {
                            error && 
                            <ListGroup.Item>
                            <Message variant='danger'>{error}</Message>
                            </ListGroup.Item>
                        }
                    
                    </ListGroup>
                 }
                    
                    <Button 
                    type ='button' 
                    className='btn-block' 
                    disabled={cart.cartItems.length === 0} 
                    onClick ={Place}
                    >Place Order
                    </Button>
                    

                </Card>
            </Col>

        </Row>
        
                      
        </div>
    )
}

export default PlaceOrderScreen
