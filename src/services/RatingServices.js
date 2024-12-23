import requests from './httpService';

const RatingServices = {
  addOne(body) {
    return requests.post('/rating-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/rating-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/rating-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/rating-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/rating-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/rating-admin/status/${id}`, body);
  },

};

export default RatingServices;
