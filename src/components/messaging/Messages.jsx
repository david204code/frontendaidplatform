import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import MessageFeed from './MessageFeed'
import ConversationWebSocket from './ConversationWebSocket';

class Messages extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      contents: [],
      // content1: [
      //   {id: 35, name: 'jumper', color: 'red', price: 20},
      //   {id: 42, name: 'shirt', color: 'blue', price: 15},
      //   {id: 71, name: 'socks', color: 'black', price: 5},      ] 
    };

    // explaination needed here!
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    // console.log(this.props.conversation)
    axios.get(`http://localhost:3001/conversation/${this.props.conversation.id}`)
    .then ( response => {
      // console.log(response.data.messages)
      this.setState({contents: response.data.messages});
      // console.log(this.state.contents)
    })
    .catch ( response => console.log(response) )
        
  }
  
  updateApp = (newConversation) => {
    this.setState({
      contents: newConversation
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    let content = content;

    axios.post(`http://localhost:3001/messages`,
      {
        content: this.state.content,
        conversation_id: this.props.conversation.id,
        user_id: this.props.user.id
      },
      { withCredentials: true }
    ).then(response => {
      if (response.status === 200) {
        // console.log("Message created")
      }
      let messageDiv = document.getElementById('messages')
      messageDiv.scrollTop = messageDiv.scrollHeight
    }).catch(error => {
      console.log("not created", error);
    });
    this.setState({
      message: ''
    });
  };

  handleChange(event){
    this.setState({
      message: event.target.value,
    });
  };
  
  render() {
    // {console.log(this.state.contents)}

    // const contents = this.state.contents.map((content, key) =>
    // <p key ={content.id}>{content.content} from {content.user.email}</p>
    // );

    return (
      <Fragment>
        <div>
          {/* {console.log(this.props.user.id)} */}
          {/* {console.log(this.state.contents)} */}
          Hello from Message Component

          {/* {contents} */}
          <MessageFeed contents ={this.state.contents} user ={this.props.user}/>
        <form onSubmit ={this.handleSubmit}>
          <textarea 
            row ="1" 
            cols ="50"
            name ="content"
            required
            value ={this.state.message}
            onChange ={this.handleChange}
          />
          
          <button type ="submit">
            Start
          </button>
        </form>
        </div>

        <ConversationWebSocket 
          cableApp = {this.props.cableApp}
          conversation = {this.props.conversation}
          updateApp = {this.updateApp}
        />

      </Fragment>
    )
  }
}

export default Messages;