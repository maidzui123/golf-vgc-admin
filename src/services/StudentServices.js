import requests from './httpService';

const StudentServices = {
  addOne(body) {
    return requests.post('/student-admin/add', body);
  },
  getAll({ page, limit }) {
    return requests.get(`/student-admin?page=${page}&limit=${limit}`);
  },
  getById(id, body) {
    return requests.post(`/student-admin/${id}`, body);
  },

  updateOne(id, body) {
    return requests.put(`/student-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/student-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/student-admin/status/${id}`, body);
  },

};

export default StudentServices;
