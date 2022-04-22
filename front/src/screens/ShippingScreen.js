import React, {useState} from 'react'
import {Container,Form,Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'

import {shipping} from '../actions/cartActions'
import Checkouts from '../Checkouts'

const ShippingScreen=({history})=> {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [country,setCountry] = useState(shippingAddress.country)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)  
    
    const dispatch = useDispatch()

    

    const send=(e)=>{
        e.preventDefault()
        dispatch(shipping({address,postalCode,city,country}))
        history.push('/payment')
    }
    return (
      <div>
        <Checkouts s1 s2 />
        <h1 style={{ textAlign:'center'}}>Shipping</h1>
                
        <Container className="d-flex justify-content-center">
        <Form onSubmit = {send} >
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" required placeholder="Enter your Address" value={address ? address : ''} 
             onChange = {(e)=>setAddress(e.target.value)} 
           />
          
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="number" required placeholder="Enter your Postal Code" value={postalCode ? postalCode : ''} 
             onChange = {(e)=>setPostalCode(e.target.value)} 
           />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter City" value={city ? city : ''}
          onChange = {(e)=>setCity(e.target.value)}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter your Country" value={country ? country :''}
          onChange = {(e)=>setCountry(e.target.value)}  />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Continue
        </Button>
        
       </Form>
      
        </Container>
        </div>
    )
}

export default ShippingScreen
