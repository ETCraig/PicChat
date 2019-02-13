import React, { Component } from 'react';
import './App.css';

//Dependencies 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import store from './store';

//Components 
import Login from './components/Login';
import Register from './components/Register';

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
