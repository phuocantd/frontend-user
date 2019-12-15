import {
  UPDATE_TUTORS,
  UPDATE_TAGS,
  UPDATE_SPECIALIZATIONS,
  REQUESTING,
  REQUESTED
} from '../actions/types';

const initialState = {
  tutors: [],
  tags: [],
  specializations: [],
  isRequest: false
};

const tutorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TUTORS: {
      return { ...state, tutors: action.payload };
    }
    case UPDATE_TAGS: {
      return { ...state, tags: action.payload };
    }
    case UPDATE_SPECIALIZATIONS: {
      return { ...state, specializations: action.payload };
    }
    case REQUESTING: {
      return { ...state, isRequest: true };
    }
    case REQUESTED: {
      return { ...state, isRequest: false };
    }
    default:
      return state;
  }
};

export default tutorReducer;
