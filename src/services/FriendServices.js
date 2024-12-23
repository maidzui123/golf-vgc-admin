import requests from './httpService';

const FriendServices = {
  addOne(body) {
    return requests.post('/friend-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/friend-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/friend-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/friend-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/friend-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/friend-admin/status/${id}`, body);
  },

};

export default FriendServices;
