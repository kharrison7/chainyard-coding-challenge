import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
// import { Link } from 'react-router-dom';
// import Header from './header.js';
import request from 'superagent';
// import { NavLink } from 'react-router-dom';

export default class SingleBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
    id: 1,
    block: '',
    match: props.match,
    error: null
    };
  }

  componentWillMount() {
       let hash = this.state.match.params.value;
       if(hash === 'LatestBlock'){
         request
           // .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawblock/"+hash+"?format=json")
           .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock")
           .end((err, res) => {
             if (err) {
               console.log("failed to get blocks!");
              //  this.setState({error: res.body.error});
             } else {
              console.log("response received");
              // console.log(res);
              console.log("res.body: "+res.body);
              if(res.body !== null){
                console.log("block received");
                console.log("res.body: "+ res.body);
                // let blockJSON = JSON.stringify(res.body);
                this.setState({block: res.body});
                console.log("Individual Block: "+this.block);
              }
             }
           })
       } else {
         console.log("props: "+this.props[0]);
         request
           .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawblock/"+hash+"?format=json")
           // .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock")
           .end((err, res) => {
             if (err) {
               console.log("failed to get blocks!");
              //  this.setState({error: res.body.error});
             } else {
              console.log("response received");
              // console.log(res);
              console.log("res.body: "+res.body);
              if(res.body !== null){
                console.log("block received");
                console.log("res.body: "+ res.body);
                // let blockJSON = JSON.stringify(res.body);
                this.setState({block: res.body});
                console.log("Individual Block: "+this.block);
              }
             }
           })

       }

  }

  render(){
    let block = this.state.block;
    console.log("Block: ");
    console.log(this.state.block);
    console.log("match: ");
    console.log(this.state.match);
    let singleBlockPageContents = null;
    if (this.state.block) {
      singleBlockPageContents = <div>
                                  <p>Block Hash: {this.state.block.hash}</p>
                                  <p>Height: {block.height}</p>
                                  <p>Time: {block.time}</p>
                                  <p>Size: {block.size}</p>
                                  <p>Previous Block: {block.prev_block}</p>
                                </div>;
    } else {
      singleBlockPageContents = <div>
                                 <p>Loading Content</p>
                                </div>
    }
    return(
      <div>
        {singleBlockPageContents}
      </div>
    );
  }
}
