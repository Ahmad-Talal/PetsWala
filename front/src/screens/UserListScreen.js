import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUser,userDeleted} from '../actions/userActions'
// import axios from 'axios'
const UserListScreen = ({history}) =>{
    const dispatch=useDispatch()    

    const userList = useSelector(state=>state.userList)
    const {loading,users,error} = userList
    //const [users,setUsers] = useState([])
    
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userDelete = useSelector(state=>state.userDelete)
    const {success:successComplete} = userDelete
    
    

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUser())
        }
        else{
            history.push('/login')
        }          
    }, [successComplete,dispatch,history,userInfo])

    const deleteUserFunction=(id)=>{
        if(window.confirm("Are you sure you want to delete the user?"))
        {
        dispatch(userDeleted(id))
        }
    }

    return (
    <div>
            <h2>USERS</h2>
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
           <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            name
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            admin
                        </th>
                        <th>
                            edit 
                        </th>
                        <th>
                            delete
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && userInfo.isAdmin &&users&& (
                        users.map(val=>
                        {
                            return (
                                <tr key={val._id}>
                                    <td>
                                        {val._id}                                        
                                    </td>

                                    <td>
                                        {val.name}                                        
                                    </td>
                                    <td>
                                        {val.email}                                        
                                    </td>
                                    <td>
                                        {
                                            val.isAdmin ?
                                            <i className='fas fa-check' style={{color:'green'}}></i>
                                            :
                                            <i className='fas fa-check' style={{color:'red'}}></i>
                                        }                                        
                                    </td>

                                    <td>
                                    <LinkContainer style={{cursor:'pointer'}} to={`/admin/user/${val._id}/edit`}>
                                    <i className='fas fa-edit' ></i>
                                    </LinkContainer>
                                        
                                    </td>
                                    <td>
                                        <i className='fas fa-trash' style={{color:"red",cursor:'pointer'}} onClick={()=>deleteUserFunction(val._id)}></i>
                                    </td>

                                </tr>
                            )
                        }))
                    }
                </tbody>

            </Table>
            )}
            
    </div>
    )
}
export default UserListScreen