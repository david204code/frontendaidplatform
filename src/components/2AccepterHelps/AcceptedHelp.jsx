import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
// import Conversation from '../Conversation';

class AcceptedHelp extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      acceptedHelp: [],
      loaded: false,
    };
    
  }

  componentDidMount() {
    this._isMounted = true;
    // console.log(this.state.id)
    axios.get(`http://localhost:3001/accepted_help/${this.state.id}`)
    .then ( resp => {
      // console.log(resp.data)
      this.setState({acceptedHelp: resp.data, loaded: true})
      // console.log(this.state.acceptedHelp)
    })
    .catch ( resp => console.log(resp) )
  }

  getConversation = (id) => {
    axios.get(`http://localhost:3001/conversation/${id}`)
    .then( response => {
      console.log(response)
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // completeRequest = (event) => {
  //   event.preventDefault()
  //   const { acceptedHelp } = this.state;
  //   // console.log(acceptedHelp)

  //   axios.patch(`http://localhost:3000/completeHelp/${this.state.acceptedHelp.help.id}`,
  //     // console.log(this.state.acceptedHelp.help)
  //   )
  //   axios.patch(`http://localhost:3000/updateActive/${this.state.acceptedHelp.id}`),
  //   this.props.history.push(`/dashboard`);
  // };

  // archiveRequest = (event) => {
  //   event.preventDefault()
  //   const { acceptedHelp } = this.state;
  //   // console.log(acceptedHelp)

  //   axios.patch(`http://localhost:3000/archiveHelp/${this.state.acceptedHelp.help.id}`,
  //     // console.log(this.state.acceptedHelp.help)
  //   )
  //   axios.patch(`http://localhost:3000/updateActive/${this.state.acceptedHelp.id}`),
  //   this.props.history.push(`/dashboard`);
  // };

  render() {
    let loaded = this.state.loaded;
    return (
      <div>
        {
          loaded &&
          <Fragment>
            <div key ={this.state.acceptedHelp.id}>
              <h1>AcceptedHelp</h1>
              {/* {console.log(this.state.acceptedHelp)} */}
              {/* {console.log(localStorage.userEmail)} */}
              {/* console.log(this.state.acceptedHelp.help.user.email) */}
              {
                this.state.acceptedHelp.help.user.email === localStorage.userEmail ?
                <div>
                  <form onSubmit ={this.completeRequest}>
                    <button type ="submit">Mark the request as complete</button>
                  </form>
                  <form onSubmit ={this.archiveRequest}>
                    <button type ="submit">Archive the request as incomplete</button>
                  </form>
                </div>:
                null
              }
              <h4>HelpID: {this.state.acceptedHelp.help_id}</h4>
              <h1>Title: {this.state.acceptedHelp.help.title}</h1>
              <h3>Type of Request: {this.state.acceptedHelp.help.request_type}</h3>
              <p>Description: {this.state.acceptedHelp.help.description}</p>
            </div>
            {/* // need to pass in the props of the acceptedHelp ID */}
            {/* <Conversation 
              acceptedHelp={this.state.acceptedHelp}
              getConversation ={this.getConversation} 
              user={this.props.user} 
              cableApp = {this.props.cableApp}
            /> */}
          </Fragment>
        }
      </div>
    )
  };

};

export default AcceptedHelp;