import React from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import ConversationList from '../../components/Chat/ConversationList';
import MessageList from '../../components/Chat/MessageList';
import services from '../../api/services';
import './Messenger.css';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      messages: [],
      roomId: ''
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
  }

  handleClick(id) {
    this.setState({
      roomId: id
    });

    const { token } = this.props;

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
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            conversations={conversations}
            onClick={id => this.handleClick(id)}
          />
        </div>

        <div className="scrollable content">
          <MessageList roomId={roomId} messages={messages} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};

export default connect(mapStateToProps)(Messenger);
