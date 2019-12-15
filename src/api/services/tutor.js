import config from '../config';
import api from '../api';

export default {
  getTutorNoCondition() {
    const url = config.url.get_tutors();
    return api.getApi(url);
  },
  getTags() {
    const url = config.url.get_tags();
    return api.getApi(url);
  },
  getSpecializations() {
    const url = config.url.get_specializations();
    return api.getApi(url);
  }
};
