import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import Header from './header.js';
//A simple component used to pass props.
export default class BaseLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

render() {
    return (
      <div>
        <Header/>
        <div >
          {this.props.children}
        </div>
      </div>
    )
  }
}
