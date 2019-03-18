import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import { Link } from 'react-router-dom';
import request from 'superagent';

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

  // before the component mounts, this makes an  API request for information to display.
  componentWillMount() {
       let hash = this.state.match.params.value;
       //checks if the user is looking for the latest block.
       if(hash === 'LatestBlock'){
         request
           .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock")
           .end((err, res) => {
             if (err) {
               console.log("failed to get blocks!");
               // this.setState({error: res.body.error});
             } else {
              console.log("response received");
              if(res.body !== null){
                console.log("block received");
                this.setState({block: res.body});
              }
             }
           })
       } else {
         request
           .get("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawblock/"+hash+"?format=json")
           .end((err, res) => {
             if (err) {
               console.log("failed to get blocks!");
              //  this.setState({error: res.body.error});
             } else {
              console.log("response received");
              if(res.body !== null){
                console.log("block received");
                console.log("res.body: "+ res.body);
                this.setState({block: res.body});
                console.log("Individual Block: "+this.block);
              }
             }
           })
       }
  }

  render(){
    let block = this.state.block;
    //This allows for access to individual transaction data.
    let txInfo = <div></div>;
    if(this.state.block.tx !== undefined && this.state.block.tx !== null){
      txInfo = <div>
                  {this.state.block.tx.map( (txCode,i) => {
                      return <div key={i}>
                              <Link to={`/transaction/${ txCode.hash }`}>Transaction {i}: {txCode.hash}</Link>
                            </div>
                  })}
               </div>
    }

    //singleBlockPageContents vary based on whether the block is the latest or a specific block.
    let singleBlockPageContents = null;
    if (this.state.block && this.state.match.params.value !== 'LatestBlock') {
      singleBlockPageContents = <div>
                                  <p>Block Hash: {this.state.block.hash}</p>
                                  <p>Height: {block.height}</p>
                                  <p>Time: {block.time}</p>
                                  <p>Size: {block.size}</p>
                                  <p>Previous Block: {block.prev_block}</p>
                                  <p>Transactions: {this.state.block.tx.length}</p>
                                  <div>
                                    {txInfo}
                                  </div>
                                </div>;
    } else if (this.state.block && this.state.match.params.value === 'LatestBlock'){
      singleBlockPageContents = <div>
                                  <p>Block Hash: {this.state.block.hash}</p>
                                  <p>Height: {block.height}</p>
                                  <p>Time: {block.time}</p>
                                  <p>Transactions: {this.state.block.txIndexes.length}</p>
                                  {this.state.block.txIndexes.map( (txCode,i) => {
                                    return <div key={i}>
                                            <Link to={`/transaction/${ txCode }`}>Transaction {i}: {txCode}</Link>
                                          </div>
                                  })}
                                </div>;
    } else {
      singleBlockPageContents = <div>
                                 <p>Loading Content</p>
                                </div>
    }
    return(
      <div>
        <div className="containment-for-homepage">
          <section className="row">
            <div className="col-md-10 offset-md-1">
              {singleBlockPageContents}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
