import React, { Component } from 'react';

import Header from './components/Header/Header'; 
import Modal from './components/Modal/Modal'

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
    return (
      <div className="App">
        <Modal open={!!this.state.error} title="An Error Occurred" onClose={() => this.errorHandler(null)} ></Modal>
        <Header authenticated={this.state.isAuth} onLogout={this.logoutHandler} />
      </div>
    );
  }
}

export default App;
