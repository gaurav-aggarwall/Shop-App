import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header'; 
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import ProductsPage from './containers/Product/ProductsPage';
import ProductPage from './containers/Product/ProductPage';
import EditProduct from './containers/Product/EditProduct';
import AuthPage from './containers/Auth/Auth';

class App extends Component {
  state = {
    isAuth: false,
    authMode: 'login',
    error: null
  };


  // AUTHENTICATION HANDLER
  authHandler = (event, authData) => {
    event.preventDefault();
    let request;
    
    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }
    
    if (this.state.authMode === 'login') {
      request = axios.post('/login', authData);
    } else {
      request = axios.post('/signup', authData);
    }

    request.then(authResponse => {
        if (authResponse.status === 201 || authResponse.status === 200) {
          const token = authResponse.data.token;
          console.log(token);
          this.setState({ isAuth: true });
        }
      })
      .catch(err => {
        this.errorHandler(err.response.data.message);
        console.log(err);
        this.setState({ isAuth: false });
      });
  };


  // AUTHENTICATION MODE CHANGE
  authModeChangedHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };


  // LOGOUT HANDLER
  logoutHandler = () => {
    this.setState({ isAuth: false});
  }


  // ERROR HANDLER
  errorHandler = msg => {
    this.setState({ error: msg });
  }


  render() {
    let routes = (
      <Switch>
        <Redirect from="/" to="/products" exact />
        <Redirect from="/auth" to="/products" exact />
        <Redirect from="/signup" to="/products" exact />
        <Route path="/product/:mode" render={props => (
            <EditProduct {...props} onError={this.errorHandler} />
          )}
        />
        <Route path="/products/:id/:mode" render={props => (
            <EditProduct {...props} onError={this.errorHandler} />
          )}
        />
        <Route path="/products/:id" render={props => (
            <ProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route path="/products" render={props => (
            <ProductsPage {...props} onError={this.errorHandler} />
          )}
        />
      </Switch>
    );

    if (!this.state.isAuth) {
      routes = (
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Redirect from="/products" to="/auth" />
          <Redirect from="/product" to="/auth" />
          <Route path="/auth" render={() => (
              <AuthPage mode={this.state.authMode} onAuth={this.authHandler} onAuthModeChange={this.authModeChangedHandler} />
          )}/>
        </Switch>
      );
    }

    return (
      <div className="App">
        <Modal open={!!this.state.error} title="An Error Occurred" onClose={() => this.errorHandler(null)} >{this.state.error}</Modal>
        <Backdrop show={!!this.state.error} />
        <Header authenticated={this.state.isAuth} onLogout={this.logoutHandler} />
        {routes}
      </div>
    );
  }
}

export default App;
