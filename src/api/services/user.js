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
  updateUserTutorInfo(paymentPerHour, tags, specialization, selfIntro, token) {
    const url = config.url.tutors();
    return api.putApiWithToken(url, token, {
      paymentPerHour,
      tags,
      specialization,
      selfIntro
    });
  }
};
