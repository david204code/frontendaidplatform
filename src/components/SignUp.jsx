import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { DirectUpload } from 'activestorage';

class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
      governmentId: {},
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  };

  handleChange = (event) => {
    if (event.target.name === 'governmentId') {
      this.setState({
        [event.target.name]: event.target.files[0]
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log('submitting this form...')

    const {
      email, 
      password, 
      password_confirmation,
    } = this.state
    
    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    // axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
    // .then(response => {
    //   // debugger
    //   console.log(response);
    //   if (response.data.status === 'created') {
    //     // this.props.handleSuccessfulAuth(response)
    //   } else {
    //     this.setState({
    //       errors: response.data.errors
    //     })
    //   }
    // })

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: user})
    })
    .then(data => this.uploadFile(this.state.governmentId, data),
      axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
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
    )
  }  

  uploadFile = (file, user) => {
    const upload = new DirectUpload(file, 'http://localhost:3001/rails/active_storage/direct_uploads')
    upload.create((error, blob) => {
      if (error) {
        console.log(error)
      } else {
        fetch(`http://localhost:3001/user/${localStorage.userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({governmentId: blob.signed_id})
        })
        .then(response => response.json())
      }
    })
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <form onSubmit ={this.handleSubmit}>
          <label>email:</label>
          <input 
            type ='email' 
            name ='email' 
            value ={this.state.email} 
            onChange ={this.handleChange} 
          />
          <label>Password:</label>
          <input 
            type ='password' 
            name ='password' 
            value ={this.state.password} 
            onChange ={this.handleChange} 
          />
          <label>Password_confirmation:</label>
          <input 
            type ='password' 
            name ='password_confirmation' 
            value ={this.state.password_confirmation} 
            onChange ={this.handleChange} 
          />
          <label>Upload your governmentId:</label>
          <input type ='file' name ='governmentId' onChange ={this.handleChange} />
          <input type ='submit' value ='Create My Account' onSubmit ={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default SignUp;