import requests from './httpService';

const ChatGroupServices = {
  addOne(body) {
    return requests.post('/chatgroup-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/chatgroup-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/chatgroup-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/chatgroup-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/chatgroup-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/chatgroup-admin/status/${id}`, body);
  },

};

export default ChatGroupServices;
