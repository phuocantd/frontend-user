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
  getApiWithToken(url, token, request = {}) {
    const additional = {
      ...request,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios
      .get(url, additional)
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
  },
  postApiWithToken(url, token, data = {}, request = {}) {
    const additional = {
      ...request,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios
      .post(url, data, additional)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  putApi(url, data = {}, request = {}) {
    // request.withCredentials = true;
    return axios
      .put(url, data, request)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  putApiWithToken(url, token, data = {}, request = {}) {
    const additional = {
      ...request,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios
      .put(url, data, additional)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};
