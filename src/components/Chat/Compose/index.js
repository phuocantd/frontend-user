import React from 'react';
import './Compose.css';

export default function Compose() {
  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />
    </div>
  );
}
