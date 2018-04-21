import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessages: ''
    };
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
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
            type='text'
            placeholder='Enter your message...'
            className='chat-input'
            />
            <button className='send'>
              Send
            </button>
        </div>
      </div>
    );
  }
}

export default App;
