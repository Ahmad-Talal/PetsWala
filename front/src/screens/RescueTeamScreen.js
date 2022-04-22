import React, {useState,useEffect} from 'react';
import {Table,Image,Row,Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'

import Rating from '../components/Rating'

const RescueTeamScreen = ({history}) =>{

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
        async function rescueList(){
          
            try{
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            
                    const {data} =await axios.get('http://127.0.0.1:8000/api/rescue/rescue-teams/',
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
        rescueList()
    }
    }

    else{
        history.push('/login')
    }
             
    }, [history,userInfo,teams,state,error])

   
    return (
    <div>
            <h2>Available Rescue Teams</h2>
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
           <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Location
                        </th>
                        <th>
                            Rating
                        </th>
                        <th>
                            Description
                        </th>
                       
                        <th>
                            Report
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
                                            {t.name}
                                            <Row>
                                            <Col md={6}>
                                              <Image src={t.image} alt={t.name} fluid rounded/>                                            
                                              </Col>

                                            </Row>
                                        </td>
                                        <td>
                                            {t.location}
                                        </td>
                                        <td>
                                           
                                            <Rating value= {t.rating} color={'yellow'}/>
                                        </td>
                                        <td>
                                            {t.description}
                                        </td>

                                        <td>
                                        <LinkContainer style={{cursor:'pointer'}} to={`/report-form/${t._id}`}>
                                    <i className='fas fa-book' ></i>
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
export default RescueTeamScreen