import requests from './httpService';

const CustomerRewardServices = {
  addOne(body) {
    return requests.post('/customerreward-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/customerreward-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customerreward-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customerreward-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customerreward-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/customerreward-admin/status/${id}`, body);
  },

};

export default CustomerRewardServices;
