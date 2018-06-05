import React, {Component} from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import { API_WS_ROOT } from '../constants';
import ChatBar from './ChatBar.jsx';
import axios from 'axios';

class MessageList extends Component{

  constructor() {
    super();
    this.state = {
      messages: [],
      chatroom_id: 1
    };
  }

  handleReceivedMessage = response => {
    const { message } = response;
    console.log('Triggered')
    this.setState ({
      messages: [...this.state.messages, message]
    })
  }

  componentDidMount() {
  axios.get('http://localhost:3000/api/v1/messages')
    .then(res => {
      const messages = res.data;
      this.setState({ messages });
    });
  }



  render(){

   const messageComponent = this.state.messages.map((message, index) => {
      return <li key={message.id}>{ message.content }</li>
   })

    const main = (
            <div>
            <ActionCable channel={{ channel: 'MessagesChannel', room: this.state.chatroom_id }} onReceived={this.handleReceivedMessage} />
              <ul className="message-wrapper">
                <li className="thumb">
                  <img src="/images/lhl-duck.png" />
                </li>
                <li className="message">
                  { messageComponent }
                </li>
              </ul>
            </div>
    );
    return(
      <main>
        {main}
      </main>
    )
  }
}

export default MessageList;

//helpers

// const orderedMessages = messages => {
//   const sortedMessages = messages.sort(
//     (a, b) => new Date(a.created_at) - new Date(b.created_at)
//   );
//   return sortedMessages.map(message => {
//     return <li key={message.id}>{message.text}</li>;
//   });
// };