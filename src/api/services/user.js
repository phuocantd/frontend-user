import config from '../config';
import api from '../api';

export default {
  getUser(token) {
    const url = config.url.get_user();
    return api.getApiWithToken(url, token);
  },
  updateUser(name, address, password, token) {
    const url = config.url.update_user();
    return api.postApiWithToken(url, token, {
      name,
      address,
      password
    });
  }
};
