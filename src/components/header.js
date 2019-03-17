import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {};
  }

handleButtonClick() {

}

  render() {

    let changeButtons = {
        "marginLeft": "200pt",
        "width": "300pt",
        "display": "flex",
        "border": "1pt black blue",
        "backgroundColor": "none",
        "listStyleType": "none",
        "justifyContent": "space-between"
    }


    let rightButtons = <div style={changeButtons}>
                      <li>
                        <NavLink activeClassName="selected" onClick={this.handleButtonClick} to="/">
                          <input className='btn btn-outline-primary' type='submit' value='LogOut'/>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="selected" to="/block">
                          <span className='btn btn-outline-primary' type='submit'>Button 2</span>
                        </NavLink>
                      </li>
                    </div>;

      return (
        <div className="totalHeader" >
        <li>
          <NavLink activeClassName="selected" to="/">
            <input className='btn btn-outline-primary' type='submit' value='Homepage'/>
          </NavLink>
        </li>
         {rightButtons}
      </div>
      )
    }
  }
