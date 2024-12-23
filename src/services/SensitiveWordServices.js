import requests from './httpService';

const SensitiveWordServices = {
  addOne(body) {
    return requests.post('/sensitiveword-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/sensitiveword-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/sensitiveword-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/sensitiveword-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/sensitiveword-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/sensitiveword-admin/status/${id}`, body);
  },

};

export default SensitiveWordServices;
