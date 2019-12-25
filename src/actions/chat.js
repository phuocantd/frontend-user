import { ADD_MESSAGE } from './types';

const addMessage = (message, time, typeMessage) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
      time,
      typeMessage
    }
  };
};

export const sendMessage = (roomId, message, time, socket) => dispatch => {
  socket.emit('client-send-message', roomId, message);
  dispatch(addMessage(message, time, 'send'));
};

export const listenChat = socket => dispatch => {
  socket.on('guest-request-chat', (message, time) => {
    dispatch(addMessage(message, time, 'receive'));
  });
};
