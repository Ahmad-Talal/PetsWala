import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector }from 'react-redux';
import { Row,Col,Button,Image,ListGroup,Card,Form } from 'react-bootstrap';
import  Message  from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector (state=> state.cart)
    const { cartItems } = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty]
    )

    const remove=(id)=>
    {
        dispatch(removeFromCart(id))
    }   

    const checkoutFunction=()=>
    {
        history.push('/Login?redirect=shipping')
    }
   

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {
                        cartItems.length===0 ?(
                        <Message variant='info'>
                            Your Cart is Empty now <Link to='/'>Go Back</Link>
                        </Message>)
                        :
                            <ListGroup variant='flush'>    
                            {
                             cartItems.map( (item) =>( 
                            <ListGroup.Item key={item.product}>
                            <Row>
                            <Col md={2}>
                            
                                <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col md={3}> 
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>
                            </Col>

                            <Col md={2}>
                                ${item.price}
                            </Col>

                            <Col md={3}>
                            <Form.Control as="select" value={item.qty} onChange={(e)=>{dispatch(addToCart(item.product,Number(e.target.value)))}} >

                            {
                                [...Array(item.countInStock).keys()].map((val)=>
                                {
                                    return(     
                                    <option key={val+1} value={val+1}>
                                    {val+1}
                                    </option>)
                                }
                                )
                            }

                            </Form.Control>
                            </Col>

                            <Col md={1}>
                            <Button
                            type='button'
                            variant='dark'
                            onClick={()=>remove(item.product)}
                            >
                            <i className='fas fa-trash'></i>
                            </Button>
                            </Col>
                            </Row>
                            </ListGroup.Item>                             
                            ))}
                            </ListGroup>

                    }
                </Col>
                <Col md={4}>
                <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item >
                   
                                <h2>Subtotal
                                ({cartItems.reduce((sum,val) => sum+val.qty,0)}) ITEMS</h2> 
                                ({cartItems.reduce((sum,val) => sum+(val.qty*Number(val.price)),0).toFixed(2)
                                })
                                

                </ListGroup.Item>      
                </ListGroup>              
                
                <ListGroup.Item >              
                    <Button type ='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutFunction}>Proceed To Checkout</Button>   
                </ListGroup.Item>
              
                
                </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
