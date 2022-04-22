import React, {useState, useEffect} from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {USER_MODIFY_RESET} from '../constants/userConstants'
import {getUser,modifyUser} from '../actions/userActions'

const UserEditScreen = ({match,history}) =>{
    const userId = match.params.id
    const dispatch=useDispatch()

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [admin,setAdmin] = useState(false)
    //const [user,setUser] = useState([])
    
        
    //states
    const userGet = useSelector(state=>state.userGet)
    const {loading,user,error} = userGet
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userModify = useSelector(state=>state.userModify)
    const {loading:loadingModify,success,error:errorModify} = userModify

    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
      if(success)
      {
        dispatch({type:USER_MODIFY_RESET})
        history.push('/admin/userlist')
      } 
      else{
      if(!user || !user.name || Number(userId)!==user._id ){
        dispatch(getUser(Number(userId)))
      }
      else{
          setEmail(user.email)
          setName(user.name)
          setAdmin(user.isAdmin)
        }
      }
    }
    else{
          history.push('/login') 
        }

        }, [dispatch,userId,user,userInfo,history,success])

    const send =(e)=>{
        e.preventDefault()
        dispatch(modifyUser(Number(userId),name,email,admin))
    }
    return (

        <div>
        {
          loading ? <Loader/>
          :
          error ? <Message>{error}</Message>:
          <>
          <Link to={'/admin/userlist'}>
            Go Back
          </Link>

        <h1 style={{ textAlign:'center'}}>Edit User</h1>
        {
          loadingModify && <Loader/>
        }
        {
          errorModify && <Message>{errorModify}</Message>
        }
        <Container className="d-flex justify-content-center">
        <Form onSubmit ={send}>
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

        <Form.Group className="mb-3" controlId="isadmin">
          <Form.Check label="Is Admin"  type="checkbox" checked={admin} 
             onChange = {(e)=>setAdmin(e.target.checked)} 
           />  
        </Form.Group>

       
        
        <Button variant="primary" type="submit">
            Update
        </Button>
       </Form>
        </Container>
        </>
        }
        
       </div>
       
          )
}

export default UserEditScreen