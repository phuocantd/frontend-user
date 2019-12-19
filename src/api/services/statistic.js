import config from '../config';
import api from '../api';

export default {
  getStatistics(token) {
    const url = config.url.statistics();
    return api.getApiWithToken(url, token);
  }
};
