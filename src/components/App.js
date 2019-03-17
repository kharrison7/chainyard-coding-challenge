import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BaseLayout from './base-layout';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      block: ""
    };
  }

  componentWillMount() {
      this.setState({
        block: ""
      });
  }




  render() {
    return (
      <BrowserRouter>
        <BaseLayout>
          <Switch>

          </Switch>
        </BaseLayout>
      </BrowserRouter>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //
      //   </header>
      // </div>
    );
  }
}

export default App;
