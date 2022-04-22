import React from 'react'
import {Card} from 'react-bootstrap';
import Rating from './Rating'

import {Link} from 'react-router-dom'
 
const Product=({props})=> {
    let v=props._id
    //console.log(22222)
    //console.log(v)
    return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${v}`}>
            <Card.Img src={props.image} />
      </Link>
      
      <Card.Body>
            <Link to={`/product/${v}`}>
        <Card.Title as="div">
            <strong> {props.name}</strong>
        </Card.Title>
            </Link>
   

      <Card.Text as='div'>
        <div className='my-3'>
        <Rating propsue={props.rating} text={`${props.numReviews} reviews`} color={'yellow'}/>
        </div>
      </Card.Text>

      <Card.Text as='h3'> 
       ${props.price}        
      </Card.Text>


     </Card.Body>

    </Card>
    )
}

export default Product;
