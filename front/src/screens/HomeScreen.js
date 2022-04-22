import React, { useState,useEffect} from 'react';
import {Row,Col} from 'react-bootstrap';
import Product from '../components/Product';

import axios from 'axios'
//import p from '../products';

const HomseScreen=()=>{

    const [products,setProducts] = useState([]) 
    const [state,setState] = useState(0)

    const user = JSON.parse(localStorage.getItem("userInfo"))
    console.log(user)
     
    useEffect(() => {
        if(state===0)
        {
            async function prods(){
                
            
                const {data} =await axios.get(
                    'http://127.0.0.1:8000/api/products/'
                    )
               
                    setProducts(data)
                    setState(1)
                }   
                prods()
            
        }

    }, [state])

    return(
        <div>
        <h1>LATEST PRODUCTS</h1>
        
        <Row>
            {   
            state===1 && products.map(val=>(
                
                <Col key={val._id} sm={12} md={6} lg={4} xl={3}>
                
                 <Product props={val}/>
                </Col>
            ))}
            </Row>
            
        </div>
    )
}

export default HomseScreen;