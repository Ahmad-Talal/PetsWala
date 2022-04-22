import React, {useEffect} from 'react';
import {Table,Row,Col,Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts,deleteProduct} from '../actions/productActions'
// import axios from 'axios'
const ProductListScreen = ({history}) =>{
    const dispatch=useDispatch()    

    //states
    const productList = useSelector(state=>state.productList)
    const {loading,error,products} = productList  
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success} = productDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }
        else{
            history.push('/login')
        }          
    }, [dispatch,history,userInfo,success])

    const deleteProductFunction=(id)=>{
        if(window.confirm("Are you sure you want to delete the product?"))
        {
            dispatch(deleteProduct(id))
        }
    }

    return (
    <div>
        <Row>
            <Col md={3}>
                <h2>productS</h2>
            </Col>

            <Col md={6}>
                {" "}
            </Col>

            <Col md={3}>
                <Button variant="dark">
                    <i className="fas fa-plus" ></i>
                    {" "}Create Product
                </Button>
            </Col>
            
        </Row>

        <br/>
            {
                loadingDelete && <Loader/>
            }
            {
                errorDelete && <Message>{errorDelete}</Message>
            }
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
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Brand
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && userInfo.isAdmin && products && (
                        products.map(val=>
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
                                        {val.price}                                        
                                    </td>
                                    <td>
                                        {val.category}                                        
                                    </td>
                                    <td>
                                        {val.brand}                                        
                                    </td>
                                    <td>
                                    <LinkContainer style={{cursor:'pointer'}} to={`/admin/product/${val._id}/edit`}>
                                    <i className='fas fa-edit' ></i>
                                    </LinkContainer>
                                        
                                    </td>
                                    <td>
                                        <i className='fas fa-trash' style={{color:"red",cursor:'pointer'}} onClick={()=>deleteProductFunction(val._id)}></i>
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
export default ProductListScreen