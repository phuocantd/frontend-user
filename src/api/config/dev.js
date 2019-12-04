const DOMAIN = 'https://zapi-user.herokuapp.com/api';

export default {
  login: () => `${DOMAIN}/auth/login`,
  register: () => `${DOMAIN}/auth/register`,
  login_facebook: () => `${DOMAIN}/auth/facebook`,
  login_google: () => `${DOMAIN}/auth/google`,
  upload_avatar: () => `${DOMAIN}/user/upload`,
  update_user: () => `${DOMAIN}/user/update`
};
