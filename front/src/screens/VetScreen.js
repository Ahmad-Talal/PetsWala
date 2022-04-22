import React, {useState,useEffect} from 'react';
import {Table,Image,Row,Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import Button from '@mui/material/Button';

import Rating from '../components/Rating'

const VetScreen = ({history}) =>{

    const [loading,setLoading] = useState(true)
    const [error,setError] = useState()
    const [teams,setTeams] = useState([])
    const [state,setState] = useState(0)
    
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
  
    useEffect(() => {

        if(userInfo){

        if(state===0){
        async function vetList(){
          
            try{
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            
                    const {data} =await axios.get('http://127.0.0.1:8000/api/vet/',
                        configuration
                    )
                   
                setTeams(data)
                setState(1)
                setLoading(false)
            }
            catch(err){
                setError(err)
                setState(1)
            }
            
        }
        vetList()
    }
    }

    else{
        history.push('/login')
    }
             
    }, [history,userInfo,teams,state,error])

   
    return (
    <div>
            <h2>Available Vets</h2>
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
           <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            Profile
                        </th>
                        <th>
                            Location
                        </th>
                        <th>
                            Rating
                        </th>
                        <th>
                            Qualification
                        </th>

                        <th>
                            Experience
                        </th>
                       
                        <th>
                            Appointment
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        teams && userInfo&&(
                            teams.map(
                                t=>{
                                return(
                                    <tr key={t._id}>
                                        <td>
                                            <Row>
                                            <Col md={6}>
                                              <Image src={t.image} alt={t.name} fluid roundedCircle/>                                            
                                              </Col>

                                            </Row>

                                            {t.name}
                                        </td>
                                        <td>
                                            {t.location}
                                        </td>
                                        <td>
                                           
                                            <Rating value= {t.rating} color={'yellow'}/>
                                        </td>
                                        <td>
                                            {t.qualification}
                                        </td>

                                        <td>
                                            {t.experience} years
                                        </td>


                                    <td>
                                        <LinkContainer style={{cursor:'pointer'}} to={`/appointment/${t._id}`}>
                                        <Row>
                                            <Col md={4}>
                                            <Button variant="contained" style={{"background-color":"orange"}}>Book Appointment</Button>
                                            </Col>
                                            <Col></Col>
                                            <Col></Col>
                                        </Row>
                                          
                                    </LinkContainer>
                                        </td>
                                      
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>

            </Table>
            )}
            
    </div>
    )
}
export default VetScreen