import React from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import ConversationList from '../../components/Chat/ConversationList';
import MessageList from '../../components/Chat/MessageList';
import services from '../../api/services';
import './Messenger.css';
import config from '../../api/config/index';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      messages: [],
      roomId: '',
      socket: ''
    };
  }

  componentDidMount() {
    const { token } = this.props;
    // get list rooms
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

    // socket io
    const socket = io(config.url.DOMAIN_NOT_API).on('server-say-helo', data => {
      console.log(data);
    });

    this.setState({
      socket
    });
  }

  onSendMessage = (event, mess) => {
    const { messages } = this.state;

    if (event.key === 'Enter') {
      this.setState({
        messages: messages.concat(mess)
      });
    }
  };

  handleClick(id) {
    this.setState({
      roomId: id
    });

    const { token } = this.props;
    const { socket } = this.state;
    // get list message
    services.chat
      .getDetailRoom(token, id)
      .then(response => {
        // this.setState({
        //   isLoading: false
        // });
        if (response.success) {
          this.setState({
            messages: response.data.messages || []
          });
          socket.emit('join-room', id);
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

  render() {
    const { conversations, messages, roomId } = this.state;
    const { user } = this.props;
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            conversations={conversations}
            onClick={id => this.handleClick(id)}
          />
        </div>

        <div className="scrollable content">
          <MessageList
            roomId={roomId}
            user={user}
            messages={messages}
            onSendMessage={(event, mes) => this.onSendMessage(event, mes)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Messenger);
