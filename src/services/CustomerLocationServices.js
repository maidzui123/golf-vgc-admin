import requests from './httpService';

const CustomerLocationServices = {
  addOne(body) {
    return requests.post('/customerlocation-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/customerlocation-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customerlocation-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customerlocation-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customerlocation-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/customerlocation-admin/status/${id}`, body);
  },

};

export default CustomerLocationServices;
