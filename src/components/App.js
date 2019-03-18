import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseLayout from './base-layout';
import Homepage from './homepage.js';
import SingleBlock from './singleBlock.js'

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
            <Route exact path="/" render={(props) => ( <Homepage /> )} />
            <Route path="/:value" render={(props) => ( <SingleBlock {...props}/> )} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

export default App;
