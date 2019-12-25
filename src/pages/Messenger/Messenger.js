import React from 'react';
import { connect } from 'react-redux';
import ConversationList from '../../components/Chat/ConversationList';
import MessageList from '../../components/Chat/MessageList';
import './Messenger.css';

const Messenger = ({ token }) => {
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList token={token} />
      </div>

      <div className="scrollable content">
        <MessageList token={token} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};

export default connect(mapStateToProps)(Messenger);
