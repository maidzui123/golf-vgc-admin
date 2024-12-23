import requests from './httpService';

const BannerServices = {
  addOne(body) {
    return requests.post('/banner-admin/add', body, { "Content-Type": "application/x-www-form-urlencoded" });
  },
  getAll({ page, limit, title }) {
    return requests.get(`/banner-admin?page=${page}&limit=${limit}&title=${title}`);
  },

  getById(id) {
    return requests.get(`/banner-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.put(`/banner-admin/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },

  updateImage(id, body) {
    return requests.put(`/banner-admin/image/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },

  deleteOne(id) {
    return requests.delete(`/banner-admin/${id}`);
  },

  updateStatus(id, body) {
    return requests.put(`/banner-admin/status/${id}`, body);
  },

  removeImage(id, body) {
    return requests.put(`/banner-admin/remove-image/${id}`);
  },

  deleteMany(body) {
    return requests.post(`/banner-admin/delete/many`, body);
  }

};

export default BannerServices;
