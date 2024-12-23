import requests from './httpService';

const CareerServices = {
  addOne(body) {
    return requests.post('/career-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/career-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/career-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/career-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/career-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/career-admin/status/${id}`, body);
  },

};

export default CareerServices;
