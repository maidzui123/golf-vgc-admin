import requests from "./httpService";

const LevelServices = {
  deleteMany(body) {
    return requests.post("/level-admin/delete/many", body);
  },
  addOne(body) {
    return requests.post("/level-admin/add", body);
  },
  getById(id) {
    return requests.get(`/level-admin/${id}`);
  },

  removeBenefit(levelId, benefitId) {
    return requests.delete(`/level-admin/${levelId}/benefit/${benefitId}`);
  },

  updateOne(id, body) {
    return requests.post(`/level-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/level-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/level-admin/status/${id}`, body);
  },
  getAll({ page, limit, search}) {
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

    return requests.get(`/level-admin?${queryString}`);
  },
};

export default LevelServices;
