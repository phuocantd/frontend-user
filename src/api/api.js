import axios from 'axios';

export default {
  getApi(url, request = {}) {
    // request.withCredentials = true;
    return axios
      .get(url, request)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  postApi(url, data = {}, request = {}) {
    // request.withCredentials = true;
    return axios
      .post(url, data, request)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};
