import React, { Component } from 'react';
import './App.css';

//Dependencies 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { clearCurrentUser } from './actions/UserActions';
// import { Container } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import SecureRoute from './utils/SecureRoute';
import SetAuthToken from './utils/SetAuthToken';
import { setCurrentUser, logoutUser } from './actions/AuthActions';
import store from './store';
//Components 
import EditGeneral from './components/EditGeneral';
import EditPassword from './components/EditPassword';
import EditPaymentMethods from './components/EditPaymentMethods';
import FeedImages from './containers/FeedImages';
import Landing from './components/Landing';
import Library from './containers/Library';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Receipts from './components/Receipts';
import OtherProfile from './components/OtherProfile';
import Profile from './components/Profile';
import Register from './components/Register';
import Search from './components/Search';
import ViewImage from './components/ViewImage';

if (localStorage.jwt) {
  SetAuthToken(localStorage.jwt);
  const decoded = jwt_decode(localStorage.jwt);
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
              <Route path='/' exact component={Landing} />
              <Route path='/Login' exact component={Login} />
              <Route path='/Register' exact component={Register} />
              <Switch>
                <SecureRoute path='/Feed' exact component={FeedImages} />
                <SecureRoute path='/Receipts' exact component={Receipts} />
                <SecureRoute path='/Profile/:userId' exact component={Profile} />
                <SecureRoute path='/Creator/:handle' exact component={OtherProfile} />
                <SecureRoute path='/edit' exact component={EditGeneral} />
                <SecureRoute path='/edit-password' exact component={EditPassword} />
                <SecureRoute path='/Library' exact component={Library} />
                <SecureRoute path='/payment-methods' exact component={EditPaymentMethods} />
                <SecureRoute path='/view/:image_id' exact component={ViewImage} />
                <SecureRoute path='/Search' exact component={Search} />
              </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
