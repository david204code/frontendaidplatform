import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Welcome from './components/pages/Welcome';
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/pages/Dashboard';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: false,
      userEmail: localStorage.userEmail,
      userId: localStorage.userId,
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  };

  componentDidMount() {
    this.loginStatus()
  };

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
        this.setState({
          isLoggedin: true,
          user: response.data.user,
          userEmail: response.data.user.email,
          userId: response.data.user.id,
        })
      } else if (!response.data.logged_in) {
        this.handleLogOut()
        this.setState({
          isLoggedin: false,
          userEmail: '',
          userId: '',
          user: {}
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  // componentDidUpdate(previousProps, previousState)
  // this is actually setting the previous user NOT the current
  // this.state or this.prop
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('user', JSON.stringify(nextState.user));
    localStorage.setItem('userEmail', nextState.userEmail);
    localStorage.setItem('userId', nextState.userId);
  }

  handleLogin = (data) => {
    // console.log(data.data.user)
    this.setState({
      isLoggedin: true,
      user: data.data.user,
      userEmail: data.data.user.email,
      userId: data.data.user.id,
    });
  };

  handleLogOut = () => {
    this.setState({
      isLoggedin: false,
      user: {},
      userEmail: '',
    });
  };

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  };


  render() {
    // const userEmail = this.state.userEmail;
    // const PrivateRoute = ({ component: Component, ...rest}) => (
    //   <Route {...rest} render={(props) => (
    //     // console.log(this.state.user.email),
    //     // console.log(localStorage.user),
    //     // console.log(userEmail),
    //     // console.log(localStorage.userEmail),
    //     // console.log(localStorage.user[21]+localStorage.user[22]),
    //     !!localStorage.userEmail && localStorage.userEmail != undefined
    //     // this.state.isLoggedin === true
    //     ? <Component {...props} {...rest}/>
    //     : <Redirect to={{
    //       pathname: '/notice',
    //       state: { from: props.location }
    //     }} />
    //   )
    // }/>
    // )

    return (
      <Fragment>
        <BrowserRouter>
          <Route
            render ={props => (
              <Navbar {...props}
                isLoggedin = {this.state.isLoggedin}
                handleLogOut = {this.handleLogOut} 
                userEmail = {this.state.userEmail}
              />
            )}
          />
          <Switch>
            {/* <img src ={`http://localhost:3001/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4b3bae672748354e49cbf826f832c37bec9d1813/picture%20for%20retail%20max.jpg`} /> */}
            {/* <h1>Hi David</h1> */}
            <Route exact path ="/welcome" component ={Welcome} />

            {/* <Route exact path ="/signup" component ={SignUp} /> */}
            <Route exact path ={"/signup"}
              render ={props => (
                <SignUp {...props}
                  handleLogin ={this.handleLogin}
                  isLoggedin ={this.state.isLoggedin}
                />
              )}
            /> 
            
            {/* <Route exact path ="/login" component ={Login} /> */}
            <Route exact path ={"/login"}
              render ={props => (
                <Login {...props}
                  handleLogin ={this.handleLogin}
                  isLoggedin ={this.state.isLoggedin}
                  handleSuccessfulAuth = {this.handleSuccessfulAuth}
                />
              )}
            />

            {/* <Route exact path ="/dashboard" component ={Dashboard} /> */}
            <Route exact path ={"/dashboard"}
              render ={props => (
                <Dashboard {...props}
                  isLoggedin ={this.state.isLoggedin}
                />  
              )}
            />

          </Switch>
          <Footer/>
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App;
