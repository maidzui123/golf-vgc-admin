import requests from './httpService';

const CityServices = {
  addOne(body) {
    return requests.post('/city-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/city-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/city-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/city-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/city-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/city-admin/status/${id}`, body);
  },

};

export default CityServices;
