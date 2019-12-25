import React from 'react';
import ConversationList from '../../components/Chat/ConversationList';
import MessageList from '../../components/Chat/MessageList';
import './Messenger.css';

export default function Messenger() {
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList />
      </div>

      <div className="scrollable content">
        <MessageList />
      </div>
    </div>
  );
}
