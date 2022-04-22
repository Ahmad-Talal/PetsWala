import React, {useState} from 'react'
import {Container,Form,Button,Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'

import {payment} from '../actions/cartActions'
import Checkouts from '../Checkouts'

const  PaymentScreen=({history})=> {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [paymentMethod,setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    if(!shippingAddress.address)
    {
        history.push('/shipping')
    }
    
    const send=(e)=>{
        e.preventDefault()
        dispatch(payment(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <div>
        <Checkouts s1 s2 s3 />
        <h1 style={{ textAlign:'center'}}>Payment</h1>
                
        <Container className="d-flex justify-content-center">
        <Form onSubmit = {send} >
        <Form.Group className="mb-3" >
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
          <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name='paymentMethod' checked   
             onChange = {(e)=>setPaymentMethod(e.target.checked)} 
           >
           </Form.Check>
          
          </Col>
        </Form.Group>
      
       
        
        <Button variant="primary" type="submit">
          Continue  
        </Button>
        
       </Form>
      
        </Container>
        </div>
    )
}

export default PaymentScreen
