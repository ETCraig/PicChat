import React, { Component } from 'react';
import './App.css';

//Dependencies 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { clearCurrentUser } from './actions/UserActions';
import { Container } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import SecureRoute from './utils/SecureRoute';
import SetAuthToken from './utils/SetAuthToken';
import { setCurrentUser, logoutUser } from './actions/AuthActions';
import store from './store';
//Components 
import EditGeneral from './components/EditGeneral';
import EditPassword from './components/EditPassword';
import EditPaymentMethods from './components/EditPaymentMethods';
import Feed from './components/Feed';
import Landing from './components/Landing';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Receipts from './components/Receipts';
import OtherProfile from './components/OtherProfile';
import Profile from './components/Profile';
import Register from './components/Register';
import ViewImage from './components/ViewImage';

if (localStorage.jwtToken) {
  SetAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 3000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentUser());
    this.props.history.push('/Login');
  }
}

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <NavBar />
            <Container>
              <Route path='/' exact component={Landing} />
              <Route path='/Login' exact component={Login} />
              <Route path='/Register' exact component={Register} />
              <Switch>
                <SecureRoute path='/Feed' exact component={Feed} />
                <SecureRoute path='/Receipts' exact component={Receipts} />
                <SecureRoute path='/Profile/:userId' exact component={Profile} />
                <SecureRoute path='/Creator/:handle' exact component={OtherProfile} />
                <SecureRoute path='/edit' exact component={EditGeneral} />
                <SecureRoute path='/edit-password' exact component={EditPassword} />
                <SecureRoute path='/payment-methods' exact component={EditPaymentMethods} />
                <SecureRoute path='/view/:image_id' exact component={ViewImage} />
              </Switch>
            </Container>
          </div>
        </Router>
    );
  }
}

export default App;
