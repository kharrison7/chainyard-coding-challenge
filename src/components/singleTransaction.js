import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import request from 'superagent';

export default class SingleTransaction extends Component {
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
         console.log("props: "+this.props[0]);
         request
           .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawtx/"+hash+"?format=json")
           .end((err, res) => {
             if (err) {
               console.log("failed to get blocks!");
               // this.setState({error: res.body.error});
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

  render(){
    let block = this.state.block;
    console.log("Block: ");
    console.log(this.state.block);
    console.log("match: ");
    console.log(this.state.match);
    //singleTransactionPageContents vary based on whether the block is the latest or a specific block.
    let inputsData=<div></div>;
    if(this.state.block.inputs !== undefined && this.state.block.inputs !== null){
          inputsData = <div>
                        {this.state.block.inputs.map( (input,i) => {
                        return <div key={i}>
                                <hr />
                                <p>Input {i+1}:</p>
                                <p>Script: {input.script}</p>
                                <p>Sequence: {input.sequence}</p>
                                <p>Witness: {input.witness}</p>
                              </div>
                        })}
                      </div>;
    }

    let singleTransactionPageContents = null;
    if (this.state.block && this.state.match.params.value !== 'LatestBlock') {
      singleTransactionPageContents = <div>
                                  <p>Hash: {block.hash}</p>
                                  <p>Height: {block.block_height}</p>
                                  <p>Size: {block.size}</p>
                                  <p>Time: {block.time}</p>
                                  <p>Weight: {block.weight}</p>
                                  {inputsData}
                                </div>;
    } else {
      singleTransactionPageContents = <div>
                                 <p>Loading Content</p>
                                </div>
    }
    return(
      <div>
        <div className="containment-for-homepage">
          <section className="row">
            <div className="col-md-10 offset-md-1">
              <h5>Transaction Information: {block.tx_index}</h5>
              {singleTransactionPageContents}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
