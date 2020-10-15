import React, { useState, useEffect, Fragment } from 'react';

class Message extends React.Component {


  render() {
    return (
      <Fragment>
        {/* {console.log(this.props.content)} */}
        <p id ="message">{this.props.content.content} from {this.props.content.user.email}</p>
      </Fragment>
    )
  }
}

export default Message;