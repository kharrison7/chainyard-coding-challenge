import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Link } from 'react-router-dom';
import request from 'superagent';

export default class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blocks: [],
      totalNumberOfBlocks: 0
    };
  }

  componentWillMount() {
    let date = Date.now();
    //makes a request to the API for all the blocks for one day.
       request
         .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/blocks/"+date+"?format=json")
         // .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock")
         .end((err, res) => {
           if (err) {
             console.log("failed to get blocks!");
            //  this.setState({error: res.body.error});
           } else {
            console.log("response received");
            console.log(res);
            console.log("res.body: "+res.body);
            if(res.body !== null){
              console.log("blocks received");
              console.log(res.body.blocks);
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
              <div className="card">
                <div className="card-block">
                  <h5>Blocks from Today:</h5>
                    <div className="blocks">
                      {this.state.blocks.map( (block,i) => {
                        return <div key={i}>
                          <Link to={`/block/${ block.hash }`}>Block Hash: {block.hash}</Link>
                          <p>Height: {block.height}</p>
                          <p>Main_Chain: {block.main_chain}</p>
                          <p>Time: {block.time}</p>
                          <hr />
                        </div>
                      })}
                    </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
  }
