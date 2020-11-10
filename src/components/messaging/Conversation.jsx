import React, { useState, useEffect, Fragment } from 'react';
import MessageFeed from './MessageFeed'
import Messages from './Messages.jsx';
import axios from 'axios';
import ConversationWebSocket from './ConversationWebSocket';
import { useParams } from 'react-router-dom';

class Conversation extends React.Component {

  constructor(props) {    
    super(props);

    this.state = {
      conversationTitle: [this.props.acceptedHelp.help.title],
      acceptedHelpID: [this.props.acceptedHelp.id],
      conversation: [],
      currentConversation: {
        content: [],
        conversation_id: {},
        users: []
      },
      loaded: false,
      event: {},
      newMessage: '',
    };
    
    // this.addConversation = this.addConversation.bind(this);

  };

  componentDidMount () {
    // componentDidUpdate () {
    // console.log(this.props.acceptedHelp.conversation.id)
    // axios.get(`https://aidplatformapiheroku.herokuapp.com/conversation/${this.props.acceptedHelp.conversation.id}`)
    axios.get(`https://aidplatformapiheroku.herokuapp.com/conversation/${this.props.acceptedHelp.conversation.accepted_help_id}`)
    .then( response => {
      // console.log(response.data)
      this.setState({currentConversation: {
        content: response.data.messages, 
        conversation_id: response.data.id,
        users: this.props.user.id,
        },
        loaded: true
      })
    })
    .catch(error => console.log(error))
  }

  handleMessageInput = (event) => {
    this.setState({
      newMessage: event.target.value
    })
  }
  
  submitMessage = (event) => {
    event.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]')
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    this.setState({
      newMessage: ''
    })

    const message = {
      content: this.state.newMessage,
      conversation_id: this.props.acceptedHelp.conversation.id,
      user_id: this.props.user.id
    }
    console.log(message)
    console.log(this.state.newMessage)
    console.log(this.props.acceptedHelp.conversation.id)
    console.log(this.props.user.id)
    // console.log(this.state.currentConversation.conversation_id)
    axios.post(`https://aidplatformapiheroku.herokuapp.com/messages`, 
    { message
      // content: this.state.newMessage,
      // conversation_id: this.state.currentConversation.conversation_id,
      // user_id: this.props.user.id
    },
    // { withCredentials: true }
    ).then(response => {
      if (response.status === 200) {
      // console.log("Message created")
      }
        let messageDiv = document.getElementById('messages')
        messageDiv.scrollTop = messageDiv.scrollHeight
      }).catch(error => {
        console.log("not created", error);
      });
  }

  updateApp = () => {
    // console.log(newConversation)
    axios.get(`https://aidplatformapiheroku.herokuapp.com/conversation/${this.props.acceptedHelp.id}`)
    .then( response => { 
      this.setState({currentConversation: {
        content: response.data.messages, 
        conversation_id: response.data.id,
        users: this.props.user.id,
        }
      })
    }
    )}

  render() {
    // let { conversation } = this.state;
    let loaded = this.state.loaded;
    
    return (
      <div>
        {
          loaded && 
          <Fragment>            
            {/* {console.log(this.state.currentConversation.conversation_id)} */}
            <div>
              Conversation Component, AcceptedHelp ID {this.props.acceptedHelp.id}
            </div>
            {/* <form onSubmit ={this.addConversation}>
              <button type ="submit">
                Start
              </button>
            </form> */}
            <MessageFeed 
              conversation ={this.state.currentConversation.content} 
              currentUser ={this.props.user} 
              currentConversation ={this.updateApp}
            />
              <form onSubmit ={this.submitMessage}>
                <textarea 
                  row ="1" 
                  cols ="50"
                  name ="content"
                  required
                  value ={this.state.newMessage}
                  onChange ={this.handleMessageInput}
                />
                <button type ="submit">
                  Start
                </button>
              </form>
            {/* <Messages conversation ={this.state.conversation} user ={this.props.user} cableApp = {this.props.cableApp}/> */}
            <ConversationWebSocket 
              cableApp = {this.props.cableApp}
              conversation = {this.state.conversation}
              updateApp = {this.updateApp}
            />
          </Fragment>
        }
      </div>
    )
  }
}

export default Conversation;