import config from '../config';
import api from '../api';

export default {
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
