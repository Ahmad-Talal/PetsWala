import React, {useState, useEffect} from 'react';
import {Form,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Button from '@mui/material/Button';
import Message from '../components/Message'
import axios from 'axios'

const AppointmentScreen = ({match,history}) =>{

    const id = match.params.id

    const [details,setDetails] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [date,setDate] = useState('')
    const [state,setState] = useState(1)
    const [error,setError] = useState()
    const [message,setMessage] = useState()

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        
        if(userInfo)
        {
            
        }
        else{
            history.push('/login')
        }
    
        
    }, [history,userInfo,state,error,message])

    const send =(e)=>{
        e.preventDefault()
        async function postAppointment(){
                  
                    try{
                      const configuration = {
                        headers : {
                            'Content-type':'application/json',
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }                
                    const {data} =await axios.post(
                        `http://ec2-18-116-28-112.us-east-2.compute.amazonaws.com/api/appointment/create/${id}/`,
                        {'phonenumber':phoneNumber,'date': date, 'details':details},
                        configuration
                        )
                      //console.log("daaaata->    ",data)
                      setMessage(data)
                    }
                    catch(err){
                    
                       //console.log(err)
                       setError(err)
                    }
                    
                }
                postAppointment()
         
     
    }
    return (

  
      message ? 
      (
        <div>
          <Message variant = 'dark' >{message.detail}</Message>
          <Row>
            <Col>
    
                <Link to ='/rescue-teams'> Go Back</Link>
            </Col>
        </Row>
        </div>
      
      )
      :error ?
       <Message variant='dark'> {error.detail} </Message>
      :(
        <div>
  
        <h1>Enter Report DetaiLs</h1>
       
       <Row>
      
           <Col md={3}>
      
           </Col>
      
           <Col md={6}>
           <Form onSubmit ={send}>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Enter your arrival date</Form.Label>
          <Form.Control
          type="textarea" placeholder="Enter your date" value={date} 
             onChange = {(e)=>setDate(e.target.value)} 
           />
          
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>phoneNumber</Form.Label>
          <Form.Control
           type="phoneNumber" placeholder="Enter phoneNumber" value={phoneNumber}
          onChange = {(e)=>setPhoneNumber(e.target.value)}  />
        </Form.Group>
                
        <Button variant="contained" type="submit">Post Report</Button>
       </Form>
      
           </Col>
      
       </Row>  
      
      
       </div>
      
      )    
    )
}

export default AppointmentScreen
