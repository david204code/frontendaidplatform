import React from 'react';
import Message from './Message';

class MessageFeed extends React.Component {
  componentDidUpdate() {
    let messageDiv = document.getElementById('messages')
    messageDiv.scrollToTop = messageDiv.scrollHeight
  }
  
  displayMessage = (contents) => {
    // console.log(contents)
     return contents && contents.map(content => {
      //  console.log(content)
      return <Message key ={content.id} content ={content} user ={content.user.email}/>
     })
  }

  render() {
    return(
      <div id ="message-feed">
        <div id ="messages">
          {this.displayMessage(this.props.conversation)}
        </div>
      </div>
    )
  }

}

export default MessageFeed;