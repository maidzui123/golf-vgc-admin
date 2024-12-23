import requests from './httpService';

const LocationClubServices = {
  addOne(body) {
    return requests.post('/locationclub-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/locationclub-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/locationclub-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/locationclub-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/locationclub-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/locationclub-admin/status/${id}`, body);
  },

};

export default LocationClubServices;
