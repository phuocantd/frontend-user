import config from '../config';
import api from '../api';

export default {
  createRoom(token, data) {
    const url = config.url.rooms();
    return api.postApiWithToken(url, token, data);
  },
  getRooms(token) {
    const url = config.url.rooms();
    return api.getApiWithToken(url, token);
  },
  getDetailRoom(token, id) {
    const url = config.url.room_detail(id);
    return api.getApiWithToken(url, token);
  },
  sendMessage(token, id, data) {
    const url = config.url.room_detail(id);
    return api.putApiWithToken(url, token, data);
  }
};
