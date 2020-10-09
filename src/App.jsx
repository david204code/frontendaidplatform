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
        <h1>Hi David</h1>
        <SignUp />
        <Login />
      </Fragment>
    )
  }
}

export default App;
