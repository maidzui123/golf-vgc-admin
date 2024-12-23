import requests from './httpService';

const FavoriteTravelServices = {
  addOne(body) {
    return requests.post('/favoritetravel-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/favoritetravel-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/favoritetravel-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/favoritetravel-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/favoritetravel-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/favoritetravel-admin/status/${id}`, body);
  },

};

export default FavoriteTravelServices;
