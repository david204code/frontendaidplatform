import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state;

    let user = {
      email: email,
      password: password
    }

    axios.post('https://aidplatformapiheroku.herokuapp.com/login', {user}, 
    // {withCredentials: true}
    )
      .then(response => {
        // console.log(response);
        if (response.data.logged_in) {
          // console.log(response)
          this.handleSuccessfulAuth(response)
        } else {
          this.setState ({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error)
    )
  };

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  };

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  };    

  render() {
    return (
      <div>
        <div className ="pt-4 text-center">
          <h2>Welcome back!</h2>
          <h4>Great to see you, log in here</h4>
        </div>
        <form onSubmit={this.handleSubmit} className ="form-signin mb-4 ">
          <div className ="form-group">
            <label className ="h5">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className ="form-group">
            <label className ="h5">Password</label>
            <input 
              type="password"
              name="password"
              placeholder="Your password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className ="text-center mt-2">
            <button type="submit" className ="btn btn-info mt-1">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;