const DOMAIN = 'http://0.0.0.0:8085';

export default {
  login: () => `${DOMAIN}/api/auth/login`,
  register: () => `${DOMAIN}/api/auth/register`,
  login_facebook: () => `${DOMAIN}/api/auth/facebook`,
  login_google: () => `${DOMAIN}/api/auth/google`,
  upload_avatar: () => `${DOMAIN}/api/user/upload`,
  update_user: () => `${DOMAIN}/api/user/update`
};
