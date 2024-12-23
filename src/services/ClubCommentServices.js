import requests from "./httpService";

const ClubCommentServices = {
  addOne(body) {
    return requests.post("/clubcomment-admin/add", body);
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

    // Tạo chuỗi query hoàn chỉnh
    const queryString = queryParams.join("&");

    return requests.get(`/clubcomment-admin?${queryString}`);
  },
  getById(id) {
    return requests.get(`/clubcomment-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/clubcomment-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/clubcomment-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/clubcomment-admin/status/${id}`, body);
  },
};

export default ClubCommentServices;
