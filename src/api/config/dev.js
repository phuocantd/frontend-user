const DOMAIN = 'https://zapi-user.herokuapp.com/api';

export default {
  login: () => `${DOMAIN}/auth/login`,
  register: () => `${DOMAIN}/auth/register`,
  login_facebook: () => `${DOMAIN}/auth/facebook`,
  login_google: () => `${DOMAIN}/auth/google`,
  forgot_password: () => `${DOMAIN}/auth/forgotpassword`,
  update_forgot_password: () => `${DOMAIN}/auth/updatepassword`,
  get_upload_avatar_url: () => `${DOMAIN}/users/upload`,
  update_user: () => `${DOMAIN}/users`,
  update_avatar: () => `${DOMAIN}/users/newavatar`,
  update_password: () => `${DOMAIN}/users/newpw`,
  get_user: () => `${DOMAIN}/auth/me`,
  tutors: () => `${DOMAIN}/tutors`,
  detail_tutor: id => `${DOMAIN}/tutors/${id}`,
  get_tags: () => `${DOMAIN}/tags`,
  get_specializations: () => `${DOMAIN}/specializations`,
  contracts: () => `${DOMAIN}/contracts`,
  detail_contract: id => `${DOMAIN}/contracts/${id}`,
  complaints: () => `${DOMAIN}/complaints`,
  complaint_detail: id => `${DOMAIN}/complaints/${id}`,
  statistics: () => `${DOMAIN}/statistics/contracts`
};
