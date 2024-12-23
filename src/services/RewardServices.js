import requests from './httpService';

const RewardServices = {
  addOne(body) {
    return requests.post('/reward-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/reward-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/reward-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/reward-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/reward-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/reward-admin/status/${id}`, body);
  },

};

export default RewardServices;
