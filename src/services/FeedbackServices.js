import requests from "./httpService";

const FeedbackServices = {
  addOne(body) {
    return requests.post("/feedback-admin/add", body);
  },
  getAll({ page, limit, search }) {
    // Tạo query string dựa trên các tham số có sẵn
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

    return requests.get(`/feedback-admin?${queryString}`);
  },
  getById(id) {
    return requests.get(`/feedback-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/feedback-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/feedback-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/feedback-admin/status/${id}`, body);
  },
};

export default FeedbackServices;
