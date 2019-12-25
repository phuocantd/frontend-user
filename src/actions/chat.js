import { ADD_MESSAGE } from './types';

const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
};

export const sendMessage = (roomId, message, socket) => dispatch => {
  socket.emit('client-send-message', roomId, message);
  dispatch(addMessage(message));
};

export const listenChat = socket => dispatch => {
  socket.on('guest-request-chat', message => {
    dispatch(addMessage(message));
  });
};
