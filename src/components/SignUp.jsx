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
    }
    
  }

  handleOnChange = (event) => {
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
    console.log('submitting this form...')

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
    .then(response => response.json())
    .then(data => this.uploadFile(this.state.governmentId, data))
  }

  uploadFile = (file, user) => {
    const upload = new DirectUpload(file, 'http://localhost:3001/rails/active_storage/direct_uploads')
    upload.create((error, blob) => {
      if (error) {
        console.log(error)
      } else {
        fetch(`http://localhost:3001/users/1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({governmentId: blob.signed_id})
        })
        .then(response => response.json())
        // .then(data => this.props.updateCurrentUser(data))
      }
    })
  }

  render() {
    return (
      <Fragment>
        <form onSubmit ={this.handleSubmit}>
          <label>email:</label>
          <input 
            type ='email' 
            name ='email' 
            value ={this.state.email} 
            onChange ={this.handleOnChange} 
          />
          <label>Password:</label>
          <input 
            type ='password' 
            name ='password' 
            value ={this.state.password} 
            onChange ={this.handleOnChange} 
          />
          <label>Password_confirmation:</label>
          <input 
            type ='password' 
            name ='password_confirmation' 
            value ={this.state.password_confirmation} 
            onChange ={this.handleOnChange} 
          />
          <label>Upload your governmentId:</label>
          <input type ='file' name ='governmentId' onChange ={this.handleOnChange} />
          <input type ='submit' value ='Create My Account' onSubmit ={this.handleSubmit}/>
      </form>
      </Fragment>
    )
  }
}

export default SignUp;