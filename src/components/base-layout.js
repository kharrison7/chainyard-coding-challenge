import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
// import { Link } from 'react-router-dom';
import Header from './header.js';

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
