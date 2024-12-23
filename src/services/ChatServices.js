import requests from './httpService';

const ChatServices = {
  addOne(body) {
    return requests.post('/chat-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/chat-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/chat-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/chat-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/chat-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/chat-admin/status/${id}`, body);
  },

};

export default ChatServices;
