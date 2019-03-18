import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
// import { Link } from 'react-router-dom';
// import Header from './header.js';
import request from 'superagent';

export default class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blocks: [],
    };
  }


  componentWillMount() {
    let date = Date.now();
    console.log(date);
       request
         .get("https://blockchain.info/blocks/"+date+"?format=json")
         .end((err, res) => {
           if (err) {
             console.log("failed to get blocks!");
            //  this.setState({error: res.body.error});
           } else {
            console.log("blocks recieved");
            if(res.body !== null){
              console.log(res.body);
              console.log(res.body.blocks[0]);
              this.setState({blocks: res.body.blocks});
            }
           }
         })
  }

  render() {
      return (
        <div className="containment-for-homepage">
          <section className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card comments">
                <div className="card-block">
                  <h3>Blocks:</h3>



                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
  }
