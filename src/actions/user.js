import { LOGIN, LOGOUT, REQUESTING, REQUESTED, UPDATE_USER } from './types';
import services from '../api/services';

const login = item => {
  return {
    type: LOGIN,
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

export const logout = item => {
  return {
    type: LOGOUT,
    payload: item
  };
};

export const updateUser = item => {
  return {
    type: UPDATE_USER,
    payload: item
  };
};

export const handleAuthen = item => {
  return dispatch => {
    if (item.type === 'facebook') {
      dispatch(startRequest());
      return services.auth
        .loginFacebook(item.accessToken)
        .then(response => {
          if (!response.success) {
            item.message.error(response.error);
          }
          dispatch(login(response));
        })
        .catch(err => {
          dispatch(endRequest());
          if (err.response) {
            item.message.error(err.response.data.error);
          } else {
            item.message.error(err.message);
          }
        });
    }
    if (item.type === 'google') {
      dispatch(startRequest());
      return services.auth
        .loginGoogle(item.accessToken)
        .then(response => {
          if (!response.success) {
            item.message.error(response.message);
          }
          dispatch(login(response));
        })
        .catch(err => {
          dispatch(endRequest());
          if (err.response) {
            item.message.error(err.response.data.error);
          } else {
            item.message.error(err.message);
          }
        });
    }
    const { email, password } = item;
    dispatch(startRequest());
    return services.auth
      .login(email, password)
      .then(response => {
        if (!response.success) {
          item.message.error(response.error);
        }
        dispatch(login(response));
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

export const handleRegister = item => {
  return dispatch => {
    const { email, password, role, name } = item;
    dispatch(startRequest());
    return services.auth
      .register(email, password, role, name)
      .then(response => {
        if (!response.success) {
          item.message.error(response.error);
        } else {
          item.message.success('Register successfully');
          item.message.info('Email has been sent. Please check your inbox.');
        }
        dispatch(endRequest());
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

export const handleGetUser = item => {
  const { token } = item;
  return dispatch => {
    dispatch(startRequest());
    services.user
      .getUser(token)
      .then(response => {
        dispatch(endRequest());
        if (response.success) {
          dispatch(updateUser(response.data.userInfo || {}));
        } else {
          dispatch(logout());
        }
      })
      .catch(err => {
        dispatch(endRequest());
        dispatch(logout());
        if (err.response) {
          item.message.error(err.response.data.error);
        } else {
          item.message.error(err.message);
        }
      });
  };
};
