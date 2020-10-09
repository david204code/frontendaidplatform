import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Fragment>
        <h1>Login Component</h1>
      </Fragment>
    )
  }
}

export default Login;