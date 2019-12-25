import {
  UPDATE_TUTORS,
  UPDATE_TAGS,
  UPDATE_SPECIALIZATIONS,
  REQUESTING,
  REQUESTED,
  UPDATE_PAGINATION
} from './types';
import services from '../api/services';

const updateTutors = item => {
  return {
    type: UPDATE_TUTORS,
    payload: item
  };
};

const updatePagination = item => {
  return {
    type: UPDATE_PAGINATION,
    payload: item
  };
};

const updateTags = item => {
  return {
    type: UPDATE_TAGS,
    payload: item
  };
};

const updateSpecializations = item => {
  return {
    type: UPDATE_SPECIALIZATIONS,
    payload: item
  };
};

const startRequest = item => {
  return {
    type: REQUESTING,
    payload: item
  };
};

const endRequest = item => {
  return {
    type: REQUESTED,
    payload: item
  };
};

export const getTutorsNoCondition = item => {
  return dispatch => {
    dispatch(startRequest());
    services.tutor
      .getTutorNoCondition()
      .then(response => {
        dispatch(endRequest());
        if (response.success) {
          dispatch(updateTutors(response.data.results));
          dispatch(
            updatePagination({
              ...response.data.pagination,
              count: response.data.count
            })
          );
        }
      })
      .catch(err => {
        dispatch(endRequest());
        if (err.response) {
          item.message.error(err.response.data.error);
        } else {
          item.message.error(err.message);
        }
      });
  };
};
export const getTutorsCondition = item => {
  const { address, tag, specialization, paymentPerHour, page, sort } = item;
  return async dispatch => {
    dispatch(startRequest());
    await services.tutor
      .getTutorCondition(
        address,
        paymentPerHour,
        specialization,
        tag,
        page,
        sort
      )
      .then(response => {
        dispatch(endRequest());
        if (response.success) {
          dispatch(updateTutors(response.data.results));
          dispatch(
            updatePagination({
              ...response.data.pagination,
              count: response.data.count
            })
          );
        }
      })
      .catch(err => {
        dispatch(endRequest());
        if (err.response) {
          item.message.error(err.response.data.error);
        } else {
          item.message.error(err.message);
        }
      });
  };
};

export const getTagsList = item => {
  return dispatch => {
    dispatch(startRequest());
    services.tutor
      .getTags()
      .then(response => {
        dispatch(endRequest());
        if (response.success) {
          dispatch(updateTags(response.data));
        }
      })
      .catch(err => {
        dispatch(endRequest());
        if (err.response) {
          item.message.error(err.response.data.error);
        } else {
          item.message.error(err.message);
        }
      });
  };
};

export const getSpecializationsList = item => {
  return dispatch => {
    dispatch(startRequest());
    services.tutor
      .getSpecializations()
      .then(response => {
        dispatch(endRequest());
        if (response.success) {
          dispatch(updateSpecializations(response.data));
        }
      })
      .catch(err => {
        dispatch(endRequest());
        if (err.response) {
          item.message.error(err.response.data.error);
        } else {
          item.message.error(err.message);
        }
      });
  };
};
