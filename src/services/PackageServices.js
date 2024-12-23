import requests from './httpService';

const PackageServices = {
  addOne(body) {
    return requests.post('/package-admin/add', body);
  },
  getAll(body) {
    return requests.post('/package-admin', body);
  },
  getById(id, body) {
    return requests.post(`/package-admin/${id}`, body);
  },

  updateOne(id, body) {
    return requests.put(`/package-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/package-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/package-admin/status/${id}`, body);
  },

};

export default PackageServices;
