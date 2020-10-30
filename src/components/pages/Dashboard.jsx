import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  };

  render() {
    return (
      <div>
        {/* <h1>Dashboard page</h1> */}
        <section className="jumbotron text-center">
          <div className="container">
            <h1>Dashboard</h1>
            <p className="lead text-muted">
              Thank you for joining us. Be encourage as you help your community
            </p>
            <p>
              <Link to ="/postedhelps">
                <button className ="btn btn-primary my-2">
                  Request(s) you have posted
                </button>
              </Link>
            </p>
            <p>
              <Link to ="/acceptedhelps">
                <button className ="btn btn-primary my-2">
                  Request(s) you have accepted
                </button>
              </Link>
            </p>
            <p>
              <Link to ="/profile">
                <button className ="btn btn-secondary my-2">
                  Your Profile
                </button>
              </Link>
            </p>
          </div>
        </section>
        {/* <img src ={`https://aidplatformapiheroku.herokuapp.com//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4b3bae672748354e49cbf826f832c37bec9d1813/picture%20for%20retail%20max.jpg`} /> */}
      </div>
    );
  };
};

export default Dashboard;