import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cable from 'actioncable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: ''
    };
  }

  componentWillMount() {
    this.createSocket();
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        console.log(data);
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className='stage'>
          <h1>Chat</h1>
          <div className='chat-logs'>
          </div>
          <input
            value= { this.state.currentChatMessage }
            onChange= { (e) => this.updateCurrentChatMessage(e) }
            type='text'
            placeholder='Enter your message...'
            className='chat-input'
            />
            <button
              onClick={ (e) => this.handleSendEvent(e) }
              className='send'>
              Send
            </button>
        </div>
      </div>
    );
  }
  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({
      currentChatMessage: ''
    });
  }
}

export default App;
