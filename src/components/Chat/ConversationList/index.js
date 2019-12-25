import React from 'react';
import { List } from 'antd';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import './ConversationList.css';

const ConversationList = props => {
  const { conversations, onClick } = props;
  return (
    <List className="conversation-list">
      <ConversationSearch />
      {conversations.map(conversation => (
        <ConversationListItem
          key={conversation.id}
          idRoom={conversation.id}
          data={conversation}
          onClick={() => onClick(conversation.id)}
        />
      ))}
    </List>
  );
};

export default ConversationList;
