import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';

import './ConversationList.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getConversations();
  }, []);

  const getConversations = () => {
    console.log(props);
    axios.get('https://randomuser.me/api/?results=5').then(response => {
      const newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text:
            'Hello world! This is a long message that needs to be truncated.'
        };
      });
      setConversations([...conversations, ...newConversations]);
    });
  };

  return (
    <div className="conversation-list">
      <ConversationSearch />
      {conversations.map(conversation => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))}
    </div>
  );
}
