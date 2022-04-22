import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav, Container,NavDropdown } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import {logoutUser} from '../actions/userActions'
const Header=()=> {
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin


  useEffect(() => {
    
  }, [userInfo])
  const logOutFunction = ()=>{
    dispatch(logoutUser())
  }
    return (
        <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect  >
        <Container>

<LinkContainer to='/'>
  <Navbar.Brand  >PETs wALA</Navbar.Brand>
 </LinkContainer>
 
 <Navbar.Toggle aria-controls="basic-navbar-nav" />
 
 <Navbar.Collapse id="basic-navbar-nav">
 <Nav className="mr-auto">
 
 { userInfo&&!userInfo.vet&&(
  <LinkContainer to='/Cart'>
    <Nav.Link ><i className="fas fa-shopping-cart"></i>{" "}Cart</Nav.Link>
 </LinkContainer>
 )
}

 {userInfo ? (  

  <NavDropdown title = {userInfo.name} id='username'>
  
    
   <LinkContainer to='/profile'>
   <NavDropdown.Item>PROFILE</NavDropdown.Item>
   </LinkContainer>

  
  <NavDropdown.Item onClick={logOutFunction}> LOGOUT</NavDropdown.Item>
  </NavDropdown>

 ):  (<LinkContainer to='/Login'>
      <Nav.Link ><i className="fas fa-user "></i>Login</Nav.Link>
</LinkContainer>)}
{
  userInfo&&!userInfo.vet&&(

    <>
    <LinkContainer to='/rescue-teams'>
    <Nav.Link ><i className="far fa-life-ring"></i>{" "}Rescue Report</Nav.Link>
 </LinkContainer>

 <LinkContainer to='/vets'>
    <Nav.Link ><i className="fa fa-plus-square" style={{"color":"red"}}></i>{" "}Vet Help</Nav.Link>
 </LinkContainer>

 <NavDropdown title = "Become a" id='username'>
  
    
   <LinkContainer to='/register-vet'>
   <NavDropdown.Item>VET</NavDropdown.Item>
   </LinkContainer>
   </NavDropdown>
    </>
  )

}
{
  userInfo && userInfo.isAdmin &&(  

<NavDropdown title = "Admin" id='Admin-queue'>

  
<LinkContainer to='/admin/userlist'>
<NavDropdown.Item>usersList</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/admin/orders'>
<NavDropdown.Item>orders</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/admin/products'>
<NavDropdown.Item>products</NavDropdown.Item>
</LinkContainer>

</NavDropdown>

)}  
 
 </Nav>
 
 </Navbar.Collapse>
  </Container>
</Navbar>   
        </header>
    )
}

export default Header
