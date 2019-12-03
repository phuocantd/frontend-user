import config from '../config';
import api from '../api';

export default {
  login(email, password) {
    const url = config.url.login();
    return api.postApi(url, { email, password });
  },
  loginFacebook(accessToken) {
    const url = config.url.login_facebook();
    return api.postApi(url, { access_token: accessToken });
  },
  loginGoogle(accessToken) {
    const url = config.url.login_google();
    return api.postApi(url, { access_token: accessToken });
  },
  register(email, password, role, name) {
    const url = config.url.register();
    return api.postApi(url, { email, password, role, name });
  }
};
