import requests from './httpService';

const CourseServices = {
  addOne(body) {
    return requests.post('/course-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/course-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/course-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/course-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/course-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/course-admin/status/${id}`, body);
  },

};

export default CourseServices;
