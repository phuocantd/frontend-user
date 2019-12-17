import config from '../config';
import api from '../api';

export default {
  createComplaint(token, data) {
    const url = config.url.complaints();
    return api.postApiWithToken(url, token, data);
  },
  updateComplaint(token, id, data) {
    const url = config.url.complaint_detail(id);
    return api.putApiWithToken(url, token, data);
  }
};
