import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//A simple navigation header.
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      isLatest: false,
    };
  }
//ideally this would be passed down as a prop to re-render the singleBlock component onClick.
handleButtonClick() {
  this.setState(prevState => ({
      isLatest: !prevState.isLatest
    }));
}

  render() {
    // This styles the buttons on the right.
    let changeButtons = {
        "marginLeft": "30%",
        "width": "100pt",
        "display": "flex",
        "border": "1pt black blue",
        "backgroundColor": "none",
        "listStyleType": "none",
        "justifyContent": "space-between"
    }
    // This styles the outer header boundary and content positions.
    let entireHeader = {
        "width": "100%",
        "display": "flex",
        "listStyleType": "none",
        "justifyContent": "center",
        "backgroundColor": "#fafafb",
        "padding": "20px"
    }

    let rightButton = <div style={changeButtons}>
                      <li>
                        <NavLink activeClassName="selected" onClick={this.handleButtonClick} to="/block/LatestBlock">
                          <input className='btn btn-outline-primary' type='submit' value='Latest Block'/>
                        </NavLink>
                      </li>
                    </div>;

      return (
        <div className="totalHeader" style={entireHeader}>
        <li>
          <NavLink activeClassName="selected" to="/">
            <input className='btn btn-outline-primary' type='submit' value='Homepage'/>
          </NavLink>
        </li>
         {rightButton}
      </div>
      )
    }
  }
