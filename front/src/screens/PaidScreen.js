import React, {useEffect} from 'react'
import {ListGroup,Card,Col,Row} from 'react-bootstrap';
import { useDispatch,useSelector} from 'react-redux'

import Message from '../components/Message'
import {getOrderDetails} from '../actions/orderActions'
import { ORDER_RESET } from '../constants/orderConstants';
import Loader from '../components/Loader';

const PaidScreen = ({match})=> {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order,error,loading} = orderDetails
    
    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((sum,val) => 
        sum + val.price*val.qty,0).toFixed(2)
    }
    
    useEffect(() => {
        
            if(!order || order._id !==Number(orderId)){
            dispatch(
                getOrderDetails(orderId)
            )
            
        }
             
    }, [dispatch,order,orderId])

    return (
        <div>
        
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        
        {!loading && !error &&
        <div>
        <h1>ORDER:</h1>

        <Row>
            <Col md={8}>
            <ListGroup variant="flush"                          >
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong>{` ${order.user.name}`} <br></br>
                        <strong>Email: </strong>
                        <a href={`mailto:${order.user.email}`} >{order.user.email}</a>
                        <br></br>
                        <strong>Shipping: </strong>
                        {order.shippingAddress.address}{' '},
                        {order.shippingAddress.postalCode}{' '},
                        {order.shippingAddress.city}{' '},
                        {order.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                
                
                {order.isDelivered ?(
                    <ListGroup.Item>
                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    </ListGroup.Item>)
                    :
                    (
                        <ListGroup.Item>
                    <Message variant='warning'>Not Delivered</Message>
                    </ListGroup.Item>)
                }
                    
                

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}{' '}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                {order.isPaid ?(
                    <Message variant='success'>Paid on {order.paidAt}</Message>)
                    :
                    (
                    <Message variant='warning'>Not Paid</Message>)
                }
                    
                </ListGroup.Item>
            </ListGroup>  
            </Col>

            <Col md={4}>
                <Card>
                    <h2 style={{textAlign:'center'}}>Order Summary</h2>
                    { order.orderItems.length === 0 ? 
                    <Message variant = 'dark'>Your cart is empty</Message> 
                    : <ListGroup vaiant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Items:</h> 
                                </Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Shipping:</h> 
                                </Col>
                                <Col>${ORDER_RESET.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Tax:</h> 
                                </Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                   <h>Total:</h> 
                                </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    
                        {
                            error &&(
                                <ListGroup.Item>
                                 <Message variant='danger'>{error}</Message>
                                 </ListGroup.Item>)
                        }  
                </ListGroup>
                 }  
                </Card>
            </Col>

        </Row>
        </div>
        }       
        </div>
    )
}

export default PaidScreen
