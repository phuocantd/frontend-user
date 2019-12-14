import config from '../config';
import api from '../api';

export default {
  getUser(token) {
    const url = config.url.get_user();
    return api.getApiWithToken(url, token);
  },
  updateUser(email, oldPassword, newPassword, passwordConfirm, name, token) {
    const url = config.url.update_user();
    const request = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.postApi(
      url,
      {
        email,
        oldPassword,
        newPassword,
        passwordConfirm,
        name
      },
      request
    );
  }
};
