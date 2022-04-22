import React, {useState, useEffect} from 'react';
//import products from '../products'
import {Row,Col,Button,Image,ListGroup,Card,Form} from 'react-bootstrap'
import {useDispatch, useSelector}from 'react-redux'
import {DetailedProduct} from '../actions/productActions'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
//import Message from '../components/Message'

const ProductScreen=({match,history}  )=> {

     let val= match.params.id
     const [qty,setQty]=useState(1)

    const dispatch=useDispatch()
    const productDetail=useSelector(state=>state.productDetail)
    const {loading,product}=productDetail
     
     useEffect(() => {
     dispatch( DetailedProduct(val))     
     }, [dispatch,match,val])

     const addToCartFunction=()=>
     { 
           history.push(`/Cart/${match.params.id}?qty=${qty}`)

     }

    return (
        <div>
        
            <Link to='/' className="btn btn-dark my-3">GO BACK</Link>
            {
                loading ? <Loader />
                :
            
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'yellow'}>{product.name}</Rating>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description:{product.description}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price:{product.price}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                  <Card   >
                    <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col >
                                Price: 
                            </Col>

                            <Col >
                                 <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item> 

                    <ListGroup.Item>
                        <Row>
                        <Col >
                            Status:                            
                        </Col>
                           <Col >
                            {product.countInStock>0 ? 'IN STOCK':'OUT OF STOCK'}                               
                            </Col>
                        </Row>
                    </ListGroup.Item> 
                    {
                        product.countInStock > 0 &&(
                        <ListGroup.Item>
                        <Row>
                        <Col >
                            Qty                            
                        </Col>
                            <Col className='my-1'>
                            <Form.Control as="select" value={qty} onChange={(e)=>{setQty(e.target.value)}} >

                           {
                                [...Array(product.countInStock).keys()].map((val)=>
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
                        </Row>
                    </ListGroup.Item> )
                    
                    }

                    <ListGroup.Item>

                    <Button onClick={addToCartFunction} className='btn-block'  type ='button' disabled={product.countInStock<1}>ADD TO CART</Button>
                    </ListGroup.Item>

                    </ListGroup>    
                  </Card>

             </Col>
            </Row>
            }
        </div>
    )
}

export default ProductScreen
