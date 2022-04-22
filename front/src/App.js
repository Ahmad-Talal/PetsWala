  import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import PaidScreen from './screens/PaidScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import AddPetScreen from './screens/AddPetScreen'
import Stripe from './screens/Stripe'
import RescueTeamScreen from './screens/RescueTeamScreen'
import ReportScreen from './screens/ReportScreen'
import VetScreen from './screens/VetScreen'
import AppointmentScreen from './screens/AppointmentScreen'
import RegisterVetScreen from './screens/RegisterVetScreen'

function App() {
  return (
    <Router >
    <Header/>
    <main className="py-5">
    <Container>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/order/:unique' component={OrderScreen} />
      <Route path='paid/order/:id' component={PaidScreen} />
      <Route path='/product/:id' component={ProductScreen}/>
      <Route path='/Cart/:id?' component={CartScreen}/>
      <Route path='/admin/userlist' component={UserListScreen}/>
      <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
      <Route path='/admin/products' component={ProductListScreen}/>
      <Route path='/add-product' component={AddPetScreen}/>
      <Route path='/stripe' component={Stripe}/>
      <Route path='/rescue-teams' component={RescueTeamScreen}/>
      <Route path='/report-form/:id' component={ReportScreen}/>
      <Route path='/vets' component={VetScreen}/>
      <Route path='/appointment/:id' component={AppointmentScreen}/>
      <Route path='/register-vet' component={RegisterVetScreen}/>
      </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
