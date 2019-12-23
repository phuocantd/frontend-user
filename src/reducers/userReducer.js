import {
  LOGIN,
  REQUESTING,
  REQUESTED,
  LOGOUT,
  UPDATE_USER,
  UPDATE_USER_INFO
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
      if (!payload.success) {
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
        token: payload.data.token
      };
    }
    case REQUESTING: {
      return {
        ...state,
        isRequest: true
      };
    }
    case REQUESTED: {
      return {
        ...state,
        isRequest: false
      };
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
      return {
        ...state,
        user: action.payload
      };
    }
    case UPDATE_USER_INFO: {
      return {
        ...state,
        user: {
          ...state.user,
          userInfo: action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default userReducer;
