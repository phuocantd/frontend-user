import config from '../config';
import api from '../api';

export default {
  getUser(token) {
    const url = config.url.get_user();
    return api.getApiWithToken(url, token);
  },
  updateUser(name, address, password, token) {
    const url = config.url.update_user();
    return api.putApiWithToken(url, token, {
      name,
      address,
      password
    });
  },
  updatePassword(currentPassword, newPassword, token) {
    const url = config.url.update_password();
    return api.putApiWithToken(url, token, {
      currentPassword,
      newPassword
    });
  },
  updateAvatar(avatar, token) {
    const url = config.url.update_avatar();
    return api.putApiWithToken(url, token, {
      avatar
    });
  },
  forgotPassword(email) {
    const url = config.url.forgot_password();
    return api.postApi(url, { email });
  },
  updateForgotPassword(newPassword, token) {
    const url = config.url.update_forgot_password();
    return api.putApi(url, { token, newPassword });
  }
};
