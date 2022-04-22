import React, { useState,useEffect} from 'react';
import {Row,Col,Container,Form} from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from 'axios'

import {useSelector} from 'react-redux'

import {LinkContainer} from 'react-router-bootstrap'
//import p from '../products';

const AddPetScreen=({history})=>{
   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [tempVariant,setTempVariant] = useState("danger")
    const [col,setCol] = useState()

    const [name,setName] = useState('')
    const [price,setPrice] = useState()
    const [description,setDescription] = useState('')
    const [image,setImage] = useState()
    const [countInStock,setCountInStock] = useState()
    const [letter,setLetter] = useState()
    const [imageNow,setImageNow] = useState(true)

    const Input = styled('input')({
        display: 'none',
      });

    const setGrey = () =>{
        setTempVariant("success")
    }
     
    const setDanger = () =>{
        setTempVariant("danger")
    }

    const setFormCol = () =>{
        setCol("border border-danger")
    }
     
    const setLeave = () =>{
        setCol("")
    }



    useEffect(() => {
        
        if (userInfo){

        }
        else{
                history.push('/login')
        }
        
    }, [userInfo,history])

    const fileHandler =async (e) =>{
        try{

        
        const file = e.target.files[0]
        const formData = new FormData()
        console.log("aaya",file)
        setImage(file.name)
        formData.append('image',file)
        
        const config = {
        headers : {
            'Content-Type':'multipart/form-data',
        }
        }
        

        const {data} = await axios.put(
            `http://127.0.0.1:8000/api/products/image/${letter}/`,
            formData,
            config
        )
          setImage(data)  


        }catch(err){

        }
        
    }

    const send = async (e)=>{
        e.preventDefault()
        console.log("aaya2")
        try{
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
        
            const {data} =await axios.post(
                `http://127.0.0.1:8000/api/products/create/`,
                {"name":name,"price":price,"description":description,"countInStock":countInStock},
                configuration
            )
            setLetter(data)
            setImageNow(false)

           
        }
        catch(err)
        {
            console.log("ERROR ->   ",err)
        }

    }

    return(
        <div>
        <Row>
        <Col md={8}>
        <h2> <i class="fas fa-dog" style={{"color": "orange"}}></i> Add Pet</h2>
        </Col>
        
        <Col  md={4}>
       
         <Row>
        <Col md={4}></Col>
        <Col md={1}></Col>
            <Col  md={7}> 
            <LinkContainer to={'/'}> 
            <Button variant="contained"> Back to Pets List</Button>
            {/* <Button className='rounded'>
           
            </Button> */}
            </LinkContainer>
            </Col>
        </Row>
             

        </Col>
        </Row>

 <Container className='mt-5 py-5 div-1' style={{backgroundColor:"#f9f9f9"}}>

        {imageNow ? (
            <Form onSubmit={send}>
            <Row className="mb-3">
            <Col>
            <Form.Group   controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control className={`rounded-pill ${col}`}   required type="name" placeholder="Enter Name of the product" value={name}
                    onChange = {(e)=>setName(e.target.value)}
                />
                </Form.Group>
            </Col>
                
                <Col>   
                <Form.Group  controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control className={`rounded-pill ${col}`} required  type="price" placeholder="Price" value={price}
                    onChange = {(e)=>setPrice(e.target.value)}
                />
                
                </Form.Group>

                </Col>
                
            </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Description</Form.Label>
                <Form.Control className={`rounded ${col} py-5`}  required type="description" placeholder="1234 Main St" value = {description}
                onChange = {(e)=>setDescription(e.target.value)}
                 />
            </Form.Group>

                    
            <Row className="mb-3">
            <Col>
            <Form.Group  controlId="count">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control className={`rounded-pill ${col}`} required  type = "Number" value={countInStock}
                    onChange = {(e)=>setCountInStock(e.target.value)}
                />
                </Form.Group>
            </Col>

            <Col>
            <Form.Group  controlId="Number">
                <Form.Label>Contact No</Form.Label>
                <Form.Control className={`rounded-pill ${col}`}  required  type = "Number"/>
                </Form.Group>
            </Col>
            
            </Row>
            
            <Button type='submit' variant="contained"> Save Product</Button>
            </Form>
        )
        :
        (
            <Form>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control className={`rounded-pill ${col} py-5`}  type='text' placeholder="upload image" value={image}
                        onChange = {(e)=>setImage(e.target.value)}
                    />
                </Form.Group>
                <Form.File
                id='image-file'
                label='Upload File'
                custiom
                onChange={fileHandler}
                >          
                </Form.File>
        </Form>

        )
        }
        

        </Container>
               
        </div>
    )
}

export default AddPetScreen;