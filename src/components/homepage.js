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

  let https = require("https");
  let theUrl = "https://blockchain.info/latestblock";
  let searchPages = (theUrl) => {
    console.log(theUrl);
    https.get(theUrl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
            console.log("chunk: "+chunk);
        });
        resp.on('end', () => {
            console.log("resp:"+resp._readableState);
            console.log("resp:"+resp[1]);


            let objString = JSON.stringify(resp);
            console.log("objString:"+objString);
            console.log("data:"+data);
            // let jsonObj = JSON.parse(data);
            // console.log(jsonObj);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
  }
  searchPages(theUrl);

//
//
//


    let date = Date.now();
    let ts = Math.round(new Date().getTime() / 1000);
    let tsYesterday = (ts - (24 * 3600))*1000;
    console.log(date);
    console.log(tsYesterday);

       request
         // .get("https://blockchain.info/blocks/"+date+"?format=json")
         .get("https://blockchain.info/latestblock")
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
