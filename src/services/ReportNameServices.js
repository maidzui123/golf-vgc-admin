import requests from './httpService';

const ReportNameServices = {
  addOne(body) {
    return requests.post('/reportname-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/reportname-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/reportname-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/reportname-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/reportname-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/reportname-admin/status/${id}`, body);
  },

};

export default ReportNameServices;
