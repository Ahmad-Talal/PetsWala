import React from 'react';
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

 const Checkouts = (s) =>{
  return (
    <Nav className="justify-content-center mb-4">
<Nav.Item>
{s.s1 ? (<LinkContainer to='/login'>
    <Nav.Link >Login</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Login</Nav.Link>
 }

</Nav.Item>
     
<Nav.Item>
{s.s2 ? (<LinkContainer to='/shipping'>
    <Nav.Link >Shipping</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Shipping</Nav.Link>
 }

</Nav.Item>

<Nav.Item>
{s.s3 ? (<LinkContainer to='/payment'>
    <Nav.Link >Payment</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Payment</Nav.Link>
 }

</Nav.Item>

<Nav.Item>
{s.s4 ? (<LinkContainer to='/placeorder'>
    <Nav.Link >Place Order</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Place Order</Nav.Link>
 }

</Nav.Item>
     
</Nav>
  );
}

export default Checkouts