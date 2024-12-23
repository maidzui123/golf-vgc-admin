import requests from './httpService';

const NotificationServices = {
  addOne(body) {
    return requests.post('/notification-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/notification-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/notification-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/notification-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/notification-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/notification-admin/status/${id}`, body);
  },

};

export default NotificationServices;
