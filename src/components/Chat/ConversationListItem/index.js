import React, { useEffect } from 'react';
import shave from 'shave';
import { List } from 'antd';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  });

  const { data, onClick } = props;
  const { photo, name, text } = data;

  return (
    <List.Item className="conversation-list-item" onClick={onClick}>
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </List.Item>
  );
}
