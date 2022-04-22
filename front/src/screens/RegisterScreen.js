import React, {useState, useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {registerUser} from '../actions/userActions'

const RegisterScreen = ({location,history}) =>{

   

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    
    const dispatch=useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state=>state.userRegister)
    const {error,loading, userInfo} = userRegister

    useEffect(() => {
        
        if(userInfo)
        {
            history.push(redirect)
        }
    
        
    }, [history,userInfo,redirect])

    const send =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setMessage("Passwords did not match")
        }
        else
        {
        dispatch(registerUser(name,email,password))
        }
    }
    return (

        <div>
        {message && <Message variant = 'dark' >{message}</Message>}
        <h1>Sign Up</h1>
        {error && <Message variant='dark'> {error} </Message>}
        {loading && <Loader/>}
        <Form onSubmit ={send}>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" required placeholder="Enter your full name" value={name} 
             onChange = {(e)=>setName(e.target.value)} 
           />
          
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" required placeholder="Enter email" value={email} 
             onChange = {(e)=>setEmail(e.target.value)} 
           />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={password}
          onChange = {(e)=>setPassword(e.target.value)}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Your Password" value={confirmPassword}
          onChange = {(e)=>setConfirmPassword(e.target.value)}  />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
       </Form>
       <Row>
           <Col>
           Have an Account?
               <Link to = {redirect ? `/login?redirect=${redirect}` : `/register`}> Sign In</Link>
           </Col>
       </Row>
        
       </div>
       
          )
}

export default RegisterScreen