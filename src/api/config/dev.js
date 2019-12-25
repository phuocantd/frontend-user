const DOMAIN = 'https://zapi-user.herokuapp.com/api';
const DOMAIN_NOT_API = 'https://zapi-user.herokuapp.com/';

export default {
  DOMAIN_NOT_API,
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
  recharge: () => `${DOMAIN}/users/recharge`,
  get_user: () => `${DOMAIN}/auth/me`,
  tutors: () => `${DOMAIN}/tutors`,
  top_tutors: () => `${DOMAIN}/tutors`,
  detail_tutor: id => `${DOMAIN}/tutors/${id}`,
  get_tags: () => `${DOMAIN}/tags`,
  get_specializations: () => `${DOMAIN}/specializations`,
  contracts: () => `${DOMAIN}/contracts`,
  detail_contract: id => `${DOMAIN}/contracts/${id}`,
  complaints: () => `${DOMAIN}/complaints`,
  complaint_detail: id => `${DOMAIN}/complaints/${id}`,
  statistics: () => `${DOMAIN}/statistics/contracts`,
  rooms: () => `${DOMAIN}/chats`,
  room_detail: id => `${DOMAIN}/chats/${id}`
};
