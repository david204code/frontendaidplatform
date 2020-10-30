import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Request extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      help: [],
      accepted: [],
      acceptedId: '',
      checkUser: '',
      userId: parseInt(localStorage.userId, 10),
      loaded: false,
    };

    this.acceptRequest = this.acceptRequest.bind(this);
  }

  componentDidMount() {

    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios.get(`https://aidplatformapiheroku.herokuapp.com//helps/${id}`)
    .then(response => {
      // console.log(response)
      this.setState({help: response.data, loaded: true})
      // console.log(this.state.help.id)
      axios.get(`https://aidplatformapiheroku.herokuapp.com//checkUser/${id}/${this.state.userId}`)
      .then(response => {
        // console.log(response.data)
        if(response.data.length === 0){
          // console.log("hi")
          this.setState({checkUser: ''})
        } else {
          this.setState({checkUser: response.data[0].user_id})
        }
        // console.log(response.data[0].user_id)
        // this.setState({checkUser: response.data[0].user_id})
      });
    })
    .catch(error => console.log(error))
  }

  checkingUser = (checkUser) => {
    // console.log(checkUser)
    return checkUser && checkUser.map(user => {
      return (
        <div key ={user.id}>
          <p key ={user.id}>id: {user.id}</p>
        </div>
      )
    })    
  }


  acceptRequest = (event) => {
    event.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]')
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    const { help } = this.state;
    const { accepted } = this.state;

    let acceptedId;
    // console.log(help.id);
    let acceptedHelp;
    // console.log(help)
    // console.log(this.props.user.id)

    axios.post("https://aidplatformapiheroku.herokuapp.com//accepted_helps",
    {
      accepted_help: {
        help_id: this.state.help.id,
        user_id: this.props.user.id,
      }
    }, { withCredentials: true }
    ).then(response => {
      axios.get(`https://aidplatformapiheroku.herokuapp.com//latest/accepted_help`)
        .then(response => {
          // console.log(response)
          this.setState({
            accepted: response.data,
            acceptedId: response.data.id,
          })
          // console.log("this.state.accepted.id: " + this.state.accepted.id);
          acceptedId = this.state.accepted.id;
          // console.log("acceptedId: " + acceptedId);
          // this.props.history.push(`/acceptedhelp/${acceptedId}`);
          axios.get(`https://aidplatformapiheroku.herokuapp.com//accepted_help/${acceptedId}`)
          .then (response => {
            // console.log(response.data)
            this.setState({
              acceptedHelp: response.data
            })
            acceptedHelp = this.state.acceptedHelp;
            // console.log(acceptedHelp);
            axios.post(`https://aidplatformapiheroku.herokuapp.com//conversations`, 
            {
              conversation: {
                title: acceptedHelp.help.title,
                accepted_help_id: acceptedHelp.id,
              }
            },
            { withCredentials: true }
            ).then(response => {
              if (response.data.status === 'created') {
                console.log(response)
              }
            }).catch(error => {
              console.log("not created", error);
            });
            axios.get(`https://aidplatformapiheroku.herokuapp.com//acceptedHelpCounter/${this.state.help.id}`)
            .then (response => {
              // console.log(response)
              if (response.data >= 5) {
                // console.log(response.data)
                axios.patch(`https://aidplatformapiheroku.herokuapp.com//updateStatus/${this.state.help.id}`, 
                // console.log(this.state.help.id),
                )
              }
            }) 
            // this.props.history.push(`/acceptedhelp/${acceptedId}`);
            this.props.history.push(`/dashboard`);
          })
        })
        .catch(error => console.log(error))
      })    
      .catch(error => console.log('api errors:', error.response)
      )
      alert("Congrgulation on accepting this request");  
    };
  
  render() {
    const { help } = this.state;
    const { accepted } = this.state;
    let loaded = this.state.loaded;
    return( 
      <div>
        { 
          loaded &&
          <Fragment>
            {/* {this.checkingUser(this.state.checkUser)} */}
            <section className ="jumbotron jumbotron-fluid text-center">
              <div className ="container py-1">
                <h1 className ="display-4">
                  Request
                </h1>
                <p className ="lead">
                  We are connecting people in our community to help and support each other
                </p>
              </div>
            </section>
    
            <div>
              <Link
                to ="/map"
                className =""
                role ="button"
              >
                <button className ="">
                  Back to the map
                </button> 
              </Link>
            </div>
            
            <div className ="container py-1">
              <h1 className ="text-center display-4">
                Request title: {help.title}
              </h1>
    
              <h2>Request ID: {help.id}</h2>
              <h2>Description
              </h2>
                <p>
                  {help.description}  
                </p>
              <h2>Type of Request: {help.request_type}</h2>
              <p>Status of the request: This request is {help.status}</p>
            </div>
    
            {/* {console.log(this.state.help.user.email)} */}
            {
              this.state.help.user.email != localStorage.userEmail & this.state.checkUser != this.state.userId  ?
              <div className ="container pb-5 text-center">
                <p className ="text-center pt-3">
                  Able to assist? Click on the button below!
                </p>
                <div className ="row">
                  <div className ="col-md-4 offset-md-4">
                    <form onSubmit={this.acceptRequest}>
                      <button type ="submit">
                        Accept this request
                      </button>
                    </form>
                  </div>
                </div>
              </div>:
              null
            }
            {
              this.state.help.user.email === localStorage.userEmail ?
              <div className ="container pb-5 text-center">
                <p className ="text-center pt-3">
                  Congratulations on making this request, 
                </p>
              </div>:
              null
            }
            {
              this.state.checkUser === this.state.userId ?
              <div className ="container pb-5 text-center">
                <p className ="text-center pt-3">
                  You have already accepted this request before, good luck!
                </p>
              </div>:
              null
            }
          </Fragment> 
        }        
      </div>
    )
  }
}

export default Request;