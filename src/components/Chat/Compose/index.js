import React from 'react';
import './Compose.css';

export default function Compose({ onSendMessage }) {
  const newMessage = {
    message: 'Allahu akbar test',
    timestamp: '2019-12-25T09:39:24.447Z',
    author: '5df27543267f38167c399770'
  };

  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        onKeyDown={e => onSendMessage(e, newMessage)}
      />
    </div>
  );
}
