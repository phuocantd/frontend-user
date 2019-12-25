import React, { Component } from 'react';
import { List, message } from 'antd';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import services from '../../../api/services';
import './ConversationList.css';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  componentDidMount() {
    const { token } = this.props;
    services.chat
      .getRooms(token)
      .then(response => {
        // this.setState({
        //   isLoading: false
        // });
        if (response.success) {
          const newConversations = response.data.map(result => {
            return {
              id: result._id,
              photo: result.tutor.userInfo
                ? result.tutor.userInfo.avatar
                : result.student.userInfo.avatar,
              name: result.tutor.userInfo
                ? result.tutor.userInfo.name
                : result.student.userInfo.name,
              text: 'You have a new message'
            };
          });
          this.setState({ conversations: newConversations });
          console.log(this.state);
        } else {
          message.error(response.error);
        }
      })
      .catch(error => {
        // this.setState({
        //   isLoading: false
        // });
        if (error.response) {
          message.error(error.response.data.error);
        } else {
          message.error(error.message);
        }
      });
  }

  handleClick = id => {
    console.log(id);
  };

  render() {
    const { conversations } = this.state;
    return (
      <List className="conversation-list">
        <ConversationSearch />
        {conversations.map(conversation => (
          <ConversationListItem
            key={conversation.id}
            idRoom={conversation.id}
            data={conversation}
            onClick={() => this.handleClick(conversation.id)}
          />
        ))}
      </List>
    );
  }
}

export default ConversationList;
