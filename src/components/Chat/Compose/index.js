import React from 'react';
import { Input, message } from 'antd';
import services from '../../../api/services';
import './Compose.css';

class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mess: ''
    };
  }

  updateValue = e => {
    e.persist();
    const newValue = e.target.value;
    this.setState({
      mess: newValue
    });
  };

  onPressEnter = e => {
    e.persist();
    const { token, roomId, onSendMessage } = this.props;
    const { mess } = this.state;
    services.chat
      .sendMessage(token, roomId, { message: mess })
      .then(response => {
        if (response.success) {
          onSendMessage(e, response.data);
        } else {
          message.error(response.error);
        }
      })
      .catch(error => {
        if (error.response) {
          message.error(error.response.data.error);
        } else {
          message.error(error.message);
        }
      });
    this.setState({
      mess: ''
    });
  };

  render() {
    const { mess } = this.state;
    return (
      <div className="compose">
        <Input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          value={mess}
          onChange={event => this.updateValue(event)}
          onPressEnter={e => this.onPressEnter(e)}
        />
      </div>
    );
  }
}

export default Compose;
