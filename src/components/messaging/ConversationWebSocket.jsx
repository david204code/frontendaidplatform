import React from 'react';

class ConversationWebSocket extends React.Component {
  // componentDidMount(){
  //   // console.log(this.props.conversation)
  //   // console.log(this.props.cableApp.cable.subscriptions)
  //   // console.log(window.location.href.match(/\d+$/)[0])
  //   // this.props.getCoversationData(window.location.href.match(/\d+$/)[0])
  //   //subscription.create() method is sending params to the subscribed action in ConversationsChannel
  //   this.props.cableApp.conversation = this.props.cableApp.cable.subscriptions.create({
  //     channel: 'ConversationsChannel',
  //     conversation: window.location.href.match(/\d+$/)[0]
  //   },
  //   {
  //     received: (updateConversation) => {
  //       this.props.updateApp(updateConversation)
  //     }
  //   })
  // }

  render() {
    return(
      <div></div>
    )
  }

}

export default ConversationWebSocket