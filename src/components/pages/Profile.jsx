import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      governmentId: '',
    };

  };

  componentDidMount() {
    axios.get(`https://aidplatformapiheroku.herokuapp.com/users/${localStorage.userId}`,)
    .then(response => {
      console.log(response)
      if(response.status == 200){
        // console.log(response.data.governmentId)
        this.setState({
          governmentId: response.data.governmentId
        })
      } else {
        console.log('fail to get governmentId')
      }
    })

  }

  render() {
    return (
      <div>
        <div>
          <h1>Profile Page</h1>
          {console.log(this.state.governmentId)}
          <img src ={`https://aidplatformapiheroku.herokuapp.com/${this.state.governmentId}`} />
        </div>
      </div>
    );
  };
};

export default Profile;