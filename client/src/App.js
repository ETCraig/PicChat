import React, { Component } from 'react';
import './App.css';

//Dependencies 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {clearCurrentUser} from './actions/UserActions';
import {Container} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import SecureRoute from './utils/SecureRoute';
import SetAuthToken from './utils/SetAuthToken';
import {setCurrentUser, logoutUser} from './actions/AuthActions';
import store from './store';

//Components 
import Login from './components/Login';
import Register from './components/Register';

if(localStorage.jwtToken) {
  SetAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 3000;

  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentUser());
    this.props.history.push('/Login');
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Container>
              <Route path='/Login' exact component={Login} />
              <Route path='/Register' exact component={Register} />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
