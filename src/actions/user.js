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
          if (response.error < 0) {
            item.message.error(response.data.message);
          }
          dispatch(login(response));
        })
        .catch(err => {
          dispatch(endRequest());
          if (err.response) {
            item.message.error(err.response.data.message);
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
          if (response.error < 0) {
            item.message.error(response.data.message);
          }
          dispatch(login(response));
        })
        .catch(err => {
          dispatch(endRequest());
          if (err.response) {
            item.message.error(err.response.data.message);
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
        if (response.error < 0) {
          if (response.data.message instanceof Array) {
            response.data.message.forEach(val => {
              item.message.error(val.msg);
            });
          } else {
            item.message.error(response.data.message);
          }
        }
        dispatch(login(response));
      })
      .catch(err => {
        dispatch(endRequest());
        if (err.response) {
          item.message.error(err.response.data.message);
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
        if (response.error < 0) {
          if (response.data.message instanceof Array) {
            response.data.message.forEach(val => {
              item.message.error(val.msg);
            });
          } else {
            item.message.error(response.data.message);
          }
        }
        dispatch(handleAuthen(item));
      })
      .catch(err => {
        dispatch(endRequest());
        if (err.response) {
          item.message.error(err.response.data.message);
        } else {
          item.message.error(err.message);
        }
      });
  };
};
