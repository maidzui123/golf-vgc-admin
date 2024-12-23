import requests from './httpService';

const BenefitServices = {
  addOne(body) {
    return requests.post('/benefit-admin/add', body);
  },
  getAll({ page, limit, search }) {
    const queryParams = [];

    if (page) {
      queryParams.push(`page=${page}`);
    }

    if (limit) {
      queryParams.push(`limit=${limit}`);
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }
    const queryString = queryParams.join("&");

    return requests.get(`/benefit-admin?${queryString}`);
    // return requests.get(`/benefit-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/benefit-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/benefit-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/benefit-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/benefit-admin/status/${id}`, body);
  },

  updateImage(id, body) {
    return requests.put(`/club-admin/image/${id}`, body, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  },

  removeImage(id) {
    return requests.put(`/club-admin/remove-image/${id}`);
  },

};

export default BenefitServices;
