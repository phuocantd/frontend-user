import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import Compose from '../Compose';
import Message from '../Message';
import services from '../../../api/services';

import './MessageList.css';

const MY_USER_ID = '5df27543267f38167c399770';

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getMessages();
  }, []);

  const getMessages = () => {
    services.chat
      // .getDetailRoom(props.token, id)
      .getDetailRoom(props.token, '5e030a44edbdd84500831b85')
      .then(response => {
        // this.setState({
        //   isLoading: false
        // });
        if (response.success) {
          setMessages([...messages, ...response.data.messages]);
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
  };

  const renderMessages = () => {
    let i = 0;
    const messageCount = messages.length;
    const tempMessages = [];

    while (i < messageCount) {
      const previous = messages[i - 1];
      const current = messages[i];
      const next = messages[i + 1];
      const isMine = current.author === MY_USER_ID;
      const currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        const previousMoment = moment(previous.timestamp);
        const previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        const nextMoment = moment(next.timestamp);
        const nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      <div className="message-list-container">{renderMessages()}</div>
      <Compose />
    </div>
  );
}
