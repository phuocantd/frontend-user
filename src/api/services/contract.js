import config from '../config';
import api from '../api';

export default {
  createContract(token, data) {
    const url = config.url.contracts();
    return api.postApiWithToken(url, token, data);
  },
  getContracts(token) {
    const url = config.url.contracts();
    return api.getApiWithToken(url, token);
  },
  getDetailContract(token, id) {
    const url = config.url.detail_contract(id);
    return api.getApiWithToken(url, token);
  },
  updateContract(token, id, data) {
    const url = config.url.detail_contract(id);
    return api.putApiWithToken(url, token, data);
  }
};
