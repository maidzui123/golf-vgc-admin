import requests from './httpService';

const TeeServices = {
  addOne(body) {
    return requests.post('/tee-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/tee-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/tee-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/tee-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/tee-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/tee-admin/status/${id}`, body);
  },

};

export default TeeServices;
