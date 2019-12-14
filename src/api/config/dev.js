const DOMAIN = 'https://zapi-user.herokuapp.com/api';

export default {
  login: () => `${DOMAIN}/auth/login`,
  register: () => `${DOMAIN}/auth/register`,
  login_facebook: () => `${DOMAIN}/auth/facebook`,
  login_google: () => `${DOMAIN}/auth/google`,
  get_upload_avatar_url: () => `${DOMAIN}/users/upload`,
  update_user: id => `${DOMAIN}/users/${id}`,
  get_user: () => `${DOMAIN}/auth/me`
};
