import requests from "./httpService";

const TickRequestServices = {
  addOne(body) {
    return requests.post("/tickrequest-admin/add", body);
  },
  getAll({ page, limit, search, status }) {
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

    if (status) {
      queryParams.push(`status=${status}`);
    }

    const queryString = queryParams.join("&");

    return requests.get(`/tickrequest-admin?${queryString}`);
  },
  getById(id) {
    return requests.get(`/tickrequest-admin/${id}`);
  },

  approveRequest(id) {
    return requests.put(`/tickrequest-admin/approve/${id}`);
  },

  rejectRequest(id, body) {
    return requests.put(`/tickrequest-admin/reject/${id}`, body);
  },

  updateOne(id, body) {
    return requests.put(`/tickrequest-admin/${id}`, body);
  },

  deleteOne(id) {
    return requests.delete(`/tickrequest-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/tickrequest-admin/status/${id}`, body);
  },
};

export default TickRequestServices;
