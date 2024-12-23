import requests from './httpService';

const ClubPostServices = {
  addOne(body) {
    return requests.post('/clubpost-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/clubpost-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/clubpost-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/clubpost-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/clubpost-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/clubpost-admin/status/${id}`, body);
  },

};

export default ClubPostServices;
