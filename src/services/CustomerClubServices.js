import requests from './httpService';

const CustomerClubServices = {
  addOne(body) {
    return requests.post('/customerclub-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/customerclub-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customerclub-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customerclub-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customerclub-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/customerclub-admin/status/${id}`, body);
  },

};

export default CustomerClubServices;
