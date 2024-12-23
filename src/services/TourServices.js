import requests from './httpService';

const TourServices = {
  addOne(body) {
    return requests.post('/tour-admin/add', body);
  },
  getAll(body) {
    return requests.post('/tour-admin', body);
  },
  getById(id, body) {
    return requests.post(`/tour-admin/${id}`, body);
  },

  updateOne(id, body) {
    return requests.put(`/tour-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/tour-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/tour-admin/status/${id}`, body);
  },

};

export default TourServices;
