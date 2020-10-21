import React, { Fragment } from 'react';
import { BroswerRouter as Router, Link } from 'react-router-dom';

class AcceptedHelps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
    
  }

  displayAcceptedHelps = (acceptedHelps) => {
    // console.log(acceptedHelps)
    return acceptedHelps && acceptedHelps.map(acceptedHelp => {
      // console.log(acceptedHelp)
      return (
        <div key ={acceptedHelp.id}>
          <h1>
            Accepted User ID: {acceptedHelp.user_id}, AcceptedHelp ID: {acceptedHelp.id}
          </h1>
          <p>Accepted by: {acceptedHelp.user.email}</p>
          <Link to = {`/acceptedhelp/${acceptedHelp.id}`}>
            View and chat
          </Link>  
        </div>
      )
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          {this.displayAcceptedHelps(this.props.acceptedHelps)}
        </div>
      </Fragment>
    )
  }
}

export default AcceptedHelps