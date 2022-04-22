import React, {useState, useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch} from 'react-redux'
import {logoutUser} from '../actions/userActions'
import  Try from './try'


import {
 
    Image,
    ImageButton,
    ImageContainer,
    ImageText,
   
  } from "./Style";

import axios from 'axios'
const RegisterVetScreen = ({location,history}) =>{
    const dispatch = useDispatch()   
    const [cordinates, setCordinates] = useState({});
    const [lat,setLat] = useState(0.0);
    const [lng,setLng] = useState(0.0);
    console.log("coords",cordinates)
    const [data, setData] = useState({  
        title: "",
        fee: 0,
        image: "",
        experience: "",
        qualification: "",
      });
    const handleCordinates=(val)=>{
      setCordinates(val);
      setLat(cordinates.lat);
      setLng(cordinates.lng);
  }

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //console.log(userInfo)
    useEffect(() => {
        
       if(userInfo )
       {
         if(userInfo.vet)
           history.push('/')
       }
       else{
        history.push('/')
       }
    
        
    }, [history,userInfo,redirect])

    const changeHandler = (e) => {
        setData({ ...data, image: e.target.files[0] });
      };
    
    const SubmitHandler = (e) => {
        e.preventDefault()
     

        Object.keys(data).forEach((val, key) => {
       
        });

  
    
        const configuration = {
          headers : {
           
              Authorization: `Bearer ${userInfo.token}`
          }
      }
 

        async function register(){
            try{
              console.log("lat he ye  ",lat)
                const res = await axios.post(
                    'http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/vet/create/',
                    {"title":data.title,"fee":data.fee,"qualification":data.qualification,"experience":data.experience,"latitude":lat,"longitude":lng},
                    configuration
                )

                
                console.log(res)
                const formData = new FormData();
                formData.append('image',data.image)
                formData.append('vet_id',res.data._id)
                const config = {
                  headers : {
                     'content-type': 'multipart/form-data',
                  }
              }
                const result = await axios.post(
                  'http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/vet/pic/',
                  formData,
                  config
              )

                console.log("maza   ",result)
                history.push('/')
                logOutFunction()
            }catch(error){
                console.log(error)
            }
        }
        register()
       
      }

      const logOutFunction = ()=>{
        dispatch(logoutUser())
      }
    

    return (

        <div>
        <Row>
          <Col md={7}>
          <h1>Sign Up As Vet</h1>
        <Form onSubmit ={SubmitHandler}>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" required placeholder="Enter your Job Title"
             onChange = {(e)=>setData({ ...data, title: e.target.value }) } 
           />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="number">
          <Form.Label>fee</Form.Label>
          <Form.Control type="number" placeholder="Enter Your fee" 
          onChange = {(e)=>setData({ ...data, fee: e.target.value })}  />
        </Form.Group>

        <ImageContainer>
            <Image type="file" name="image" required onChange={changeHandler} />
            <ImageText size="20px" weight="500">
              Drag & drop Cover image here
            </ImageText>
            <ImageButton>
              <ImageText size="20px" weight="500" text="center">
                Select Files
              </ImageText>
            </ImageButton>
            <ImageText size="10px" weight="300">
              Upload 280*280 image
            </ImageText>
          </ImageContainer>
      

        
          <Form.Group className="mb-3" controlId="text">
          <Form.Label>Experience</Form.Label>
          <Form.Control type="text" required placeholder="Enter your Experience"
             onChange = {(e)=>setData({ ...data, experience: e.target.value })} 
           />
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Qualification</Form.Label>
          <Form.Control type="text" required placeholder="Enter your Qualification" 
             onChange = {(e)=>setData({ ...data, qualification: e.target.value }) } 
           />
          
        </Form.Group>

    

        
        
        <Button variant="primary" type="submit">
          Register
        </Button>
       </Form>
       
          </Col>

        <Col md={5}>
        <Try handler={handleCordinates}/>
        </Col>

        </Row>
        
        
       </div>
       
          )
}

export default RegisterVetScreen