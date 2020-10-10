import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';

class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Fragment>
        {/* <img src ={`http://localhost:3001/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4b3bae672748354e49cbf826f832c37bec9d1813/picture%20for%20retail%20max.jpg`} /> */}
        <h1>Hi David</h1>
        <SignUp />
        <Login />
      </Fragment>
    )
  }
}

export default App;
