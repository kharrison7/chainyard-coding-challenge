import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BaseLayout from './base-layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </header>
      </div>
    );
  }
}

export default App;
