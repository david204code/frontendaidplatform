import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { DirectUpload } from 'activestorage';
import './SignUp.css'

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

    // axios.post('https://aidplatformapiheroku.herokuapp.com/users', {user}, {withCredentials: true})
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

    fetch('https://aidplatformapiheroku.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: user})
    })
    .then(data => this.uploadFile(this.state.governmentId, data, 
      alert("Congrgulation on signing up!"),
      // this.props.history.push("/login"),
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
    ))  
  }  

  uploadFile = (file, user) => {
    axios.get(`https://aidplatformapiheroku.herokuapp.com/latest/user`, 
    // {withCredentials: true}
    )
    .then(response => {
      // console.log(response)
      const upload = new DirectUpload(file, 'https://aidplatformapiheroku.herokuapp.com/rails/active_storage/direct_uploads')
      upload.create((error, blob) => {
        if (error) {
          console.log(error)
        } else {
          fetch(`https://aidplatformapiheroku.herokuapp.com/users/${response.data.id}`, {
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
    })
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className ="container pb-5">
        
        <div className ="py-4 text-center">
          <h2>Sign Up!</h2>
          <p className="lead my-3">
            Sign up by filling in the form below. We are exciting to have you join and so is your community as well. 
          </p>
        </div>

        <div className ="text-center">
          <h4>Please fill in the form:</h4>
          <form onSubmit ={this.handleSubmit}>

            {/* <div className ="form-row col-md-6 text-center" style ={{display: "inline-flex"}}>
              <div className ="form-group text-center mx-auto">
                <label className ="lead">First Name:</label>
                <input
                  placeholder="First Name"
                  className="form-control"
                >
                </input>
              </div>
              <div className ="form-group text-center mx-auto">
                <label className ="lead">Last Name:</label>
                <input
                  placeholder="Last Name"
                  className="form-control"
                >
                </input>
              </div>
            </div> */}

            <div className ="form-row">
              <div className ="form-group col-md-4 text-center mx-auto">
                <label className ="lead">Email:</label>
                <input 
                  type ='email' 
                  name ='email' 
                  className="form-control"
                  value ={this.state.email} 
                  onChange ={this.handleChange}
                  required 
                />
              </div>
            </div>

            <div className ="form-row col-md-6" style ={{display: "inline-flex"}}>
              <div className ="form-group text-center mx-auto">
                <label className ="lead">Password:</label>
                <input 
                  type ='password' 
                  name ='password' 
                  className="form-control"
                  value ={this.state.password} 
                  onChange ={this.handleChange} 
                  required
                />
              </div>
              <div className ="form-group text-center mx-auto">
                <label className ="lead">Password_confirmation:</label>
                <input 
                  type ='password' 
                  name ='password_confirmation'
                  className="form-control" 
                  value ={this.state.password_confirmation} 
                  onChange ={this.handleChange} 
                  required
                />              
              </div>
            </div>

            <div className ="row">
              <div className ="form-group col-md-6 text-center mx-auto">
                <label className ="lead">Upload your governmentId:</label> <br/>
                  <p className ="text-center pl-5 ml-5 pb-2" style ={{}}>
                    <input 
                      type ='file' 
                      name ='governmentId'
                      className =""  
                      onChange ={this.handleChange} 
                      required
                    />
                  </p>
              </div>
            </div>
            
            <input 
              className ="btn-success lead" 
              type ='submit' 
              value ='Create My Account' 
              onSubmit ={this.handleSubmit}/>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;