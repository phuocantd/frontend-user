import {
  LOGIN,
  REQUESTING,
  REQUESTED,
  LOGOUT,
  UPDATE_USER
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  user: {},
  token: '',
  isRequest: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { payload } = action;
      if (payload.error < 0) {
        return {
          ...state,
          isRequest: false,
          isLoggedIn: false
        };
      }
      return {
        ...state,
        isRequest: false,
        isLoggedIn: true,
        user: payload.data.user,
        token: payload.data.token
      };
    }
    case REQUESTING: {
      return { ...state, isRequest: true };
    }
    case REQUESTED: {
      return { ...state, isRequest: false };
    }
    case LOGOUT: {
      return {
        isLoggedIn: false,
        user: {},
        token: '',
        isRequest: false
      };
    }
    case UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
