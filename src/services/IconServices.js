import requests from './httpService';

const IconServices = {
  addOne(body) {
    return requests.post('/icon-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/icon-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/icon-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/icon-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/icon-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/icon-admin/status/${id}`, body);
  },

};

export default IconServices;
