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
      fullDate: null,
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
              console.log(res.header.date);
              let myDate = Date(res.header.date);
              this.setState({blocks: res.body.blocks, fullDate: myDate});
            }
           }
         })
  }

  render() {
      let fullDate = this.state.fullDate;
      return (
        <div className="containment-for-homepage">
          <section className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card">
                <div className="card-block">
                  <h5>Blocks from Today: {this.state.blocks.length}</h5>
                  <h5>Today is: {this.state.fullDate}</h5>
                  <hr />
                    <div className="blocks">
                      {this.state.blocks.map( (block,i) => {
                        let mainChain = '';
                        if(block.main_chain === true){
                          mainChain = <div>
                                        <p>Main_Chain: True</p>
                                      </div>
                        } else {
                          mainChain = <div>
                                        <p>Main_Chain: False</p>
                                      </div>
                        }
                        return <div key={i}>
                          <Link to={`/block/${ block.hash }`}>Block Hash: {block.hash}</Link>
                          <p>Height: {block.height}</p>
                          {mainChain}
                          <p>Raw Time: {block.time}</p>
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
