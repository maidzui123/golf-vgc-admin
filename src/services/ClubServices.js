import requests from "./httpService";

const ClubServices = {
  addOne(body) {
    return requests.post("/club-admin/add", body);
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

    return requests.get(`/club-admin?${queryString}`);
  },

  getById(id) {
    return requests.get(`/club-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.put(`/club-admin/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },

  deleteOne(id) {
    return requests.delete(`/club-admin/${id}`);
  },

  updateStatus(id, body) {
    return requests.put(`/club-admin/status/${id}`, body);
  },

  getDashboardCount: async () => {
    return requests.get("/club-admin/dashboard-count");
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

export default ClubServices;
