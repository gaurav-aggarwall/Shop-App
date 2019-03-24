import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header'; 
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import ProductsPage from './containers/Product/ProductsPage';
import ProductPage from './containers/Product/ProductPage';
import EditProduct from './containers/Product/EditProduct';

import './App.css';

class App extends Component {
  state = {
    isAuth: true,
    error: null
  };

  // LOGOUT HANDLER
  logoutHandler(){
    this.setState({ isAuth: false });
  }


  // ERROR HANDLER
  errorHandler = msg => {
    this.setState({ error: msg });
  }


  render() {
    let routes = (
      <Switch>
        <Redirect from="/" to="/products" exact />
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

    return (
      <div className="App">
        <Modal open={!!this.state.error} title="An Error Occurred" onClose={() => this.errorHandler(null)} ></Modal>
        <Backdrop show={!!this.state.error} />
        <Header authenticated={this.state.isAuth} onLogout={this.logoutHandler} />
        {routes}
      </div>
    );
  }
}

export default App;
