import requests from './httpService';

const ClubReportServices = {
  addOne(body) {
    return requests.post('/clubreport-admin/add', body);
  },
  getAll({ page, limit, search }) {
    const queryParams = [];
    console.log(search)
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

    return requests.get(`/clubreport-admin?${queryString}`);
  },

  // getAll({ page, limit }) {
  //     return requests.get(`/clubreport-admin?page=${page}&limit=${limit}`);
  // },
  getById(id) {
    return requests.get(`/clubreport-admin/${id}`);
  },
  getByPostId(postId) {
    return requests.get(`/clubreport-admin/${postId}`);
  },
  updateOne(id, body) {
    return requests.post(`/clubreport-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/clubreport-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/clubreport-admin/status/${id}`, body);
  },

  deleteMany: async (body) => {
    return requests.patch("/clubreport-admin/delete/many", body);
  },

};

export default ClubReportServices;
