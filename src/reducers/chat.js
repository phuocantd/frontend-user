import { ADD_MESSAGE, CLEAR_CHAT } from '../actions/types';

const initState = () => {
  return {
    roomId: '',
    messages: []
  };
};

const initialState = initState();

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          payload // message: {content, time, from}
        ]
      };
    case CLEAR_CHAT:
      return initState();
    default:
      return state;
  }
};

export default chatReducer;
