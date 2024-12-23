import requests from './httpService';

const PageServices = {
  addOne(body) {
    return requests.post('/page-admin/add', body);
  },
  getAll({ page, limit, title }) {
    return requests.get(`/page-admin?page=${page}&limit=${limit}&title=${title}`);
  },
  getById(id) {
    return requests.get(`/page-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/page-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/page-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/page-admin/status/${id}`, body);
  },

};

export default PageServices;
