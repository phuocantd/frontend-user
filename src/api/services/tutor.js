import _ from 'lodash';
import config from '../config';
import api from '../api';

export default {
  getTutorNoCondition() {
    const url = config.url.tutors();
    return api.getApi(url);
  },
  getTutorCondition(
    address,
    paymentPerHour,
    specialization,
    tags,
    page = 1,
    sort = 'paymentPerHour,-successRate,-averageRating',
    limit = 8
  ) {
    const params = {};
    if (!_.isEmpty(address)) {
      params.address = address;
    }
    if (!_.isEmpty(paymentPerHour)) {
      params['paymentPerHour[gte]'] = paymentPerHour.gte;
      params['paymentPerHour[lte]'] = paymentPerHour.lte;
    }
    if (!_.isEmpty(specialization)) {
      params.specialization = specialization;
    }
    if (!_.isEmpty(tags)) {
      params.tags = tags;
    }
    const request = {
      params: {
        ...params,
        sort,
        page,
        limit
      }
    };
    const url = config.url.tutors();
    return api.getApi(url, request);
  },
  getTags() {
    const url = config.url.get_tags();
    return api.getApi(url);
  },
  getSpecializations() {
    const url = config.url.get_specializations();
    return api.getApi(url);
  },
  getTutor(id) {
    const url = config.url.detail_tutor(id);
    return api.getApi(url);
  },
  getTopTutor() {
    const url = config.url.top_tutors();
    return api.getApi(url);
  }
};
