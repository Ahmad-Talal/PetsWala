import React, {useState, useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {loginUser} from '../actions/userActions'

const LoginScreen = ({location,history}) =>{

   

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
   
    const dispatch=useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state=>state.userLogin)
    const {error,loading, userInfo} = userLogin

    useEffect(() => {
        
        if(userInfo)
        {
            history.push(redirect)
        }
    
        
    }, [history,userInfo,redirect])

    const send =(e)=>{
        e.preventDefault()
        dispatch(loginUser(email,password))
    }
    return (

  <div>
  <h1>Sign in</h1>
  {error && <Message variant='dark'> {error} </Message>}
  {loading && <Loader/>}
  <Form onSubmit ={send}>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Username</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} 
       onChange = {(e)=>setEmail(e.target.value)} 
     />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter Password" value={password}
    onChange = {(e)=>setPassword(e.target.value)}  />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Sign in
  </Button>
 </Form>
 <Row>
     <Col>
     New Customer?
         <Link to = {redirect ? `/register?redirect=${redirect}` : `/register`}> Register</Link>
     </Col>
 </Row>
  
 </div>
 
    )
}

export default LoginScreen
