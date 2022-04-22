import React, {useState, useEffect} from 'react';
import {Form,Button,Row,Col,Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {detailedUser,updatedUser} from '../actions/userActions'
import {allOrdersList} from '../actions/orderActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

const ProfileScreen = ({history}) =>{
    const dispatch=useDispatch()
    
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
   
    

    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading, user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state=>state.userUpdate)
    const {success} = userUpdate

    const allOrders = useSelector(state=>state.allOrders)
    const {loading:loadingOrders, orders, error:errorOrders} = allOrders
    
    
    
    useEffect(() => {

            if(!userInfo)
            {
                history.push('/login')
            }
            else
            {
                if(!user || !user.name ||success || userInfo._id !== user._id)
                {
                    dispatch({type: USER_UPDATE_RESET})
                    dispatch(detailedUser())

                    dispatch(allOrdersList())
                }
                 else{
                     setName(user.name)
                     setEmail(user.email)
                 }
            }       
    }, [dispatch,history,userInfo,user,success,orders])

    const send =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setMessage('PassWords Did Not Match')
        }
        else
        {
        dispatch(updatedUser(name,email,password))
        setMessage('')
        }
    }

    const summary = (id) =>{
        history.push(`/order/${id}`)
    }

    return (
    <div>
        {message && <Message variant = 'dark' >{message}</Message>}
    <Row>
        <Col md={3}>

          <h2>User Profile</h2>
          {error && <Message variant='dark'> {error} </Message>}
          {loading && <Loader/>}
          <Form onSubmit={send}>
                    <Form.Group className="mb-3" controlId="text">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"  placeholder="Enter your full name" value={name}
                        onChange = {(e)=>setName(e.target.value)}
                    />
                    
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email"  placeholder="Enter email" value={email}
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
                    Update
                    </Button>
           </Form>
        </Col> 
        
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? 
                
                <Loader/>
                :
                errorOrders ? 
                <Message variant='danger'>{errorOrders}</Message>
                :
                (<Table striped responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            DATE
                        </th>
                        <th>
                            TOTAL
                        </th>
                        <th>
                            PAID
                        </th>
                        <th>
                            DELIVERED
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map(val=>
                        {
                            return (
                                <tr>
                                    <td>
                                        {val._id}                                        
                                    </td>

                                    <td>
                                        {val.createdAt.substring(0,10)}                                        
                                    </td>
                                    <td>
                                        {val.totalPrice}                                        
                                    </td>
                                    <td>
                                        {
                                            val.isPaid ?
                                            val.paidAt.substring(0,10)
                                            :
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                        }                                        
                                    </td>

                                    <td>
                                        <Button className='btn-sm' onClick={()=>summary(val._id)}>
                                            DETAILS
                                        </Button>                                        
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>)
            }
            
        </Col>    

    </Row>
    </div>
    )
}
export default ProfileScreen