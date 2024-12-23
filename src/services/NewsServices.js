import requests from "./httpService";

const NewsServices = {
  deleteMany(body) {
    return requests.post(`/news-admin/delete/many`, body);
  },
  addOne(body) {
    return requests.post("/news-admin/add", body, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  },
  getAll({ page, limit, title }) {
    return requests.get(
      `/news-admin?page=${page}&limit=${limit}&title=${title}`
    );
  },
  getById(id) {
    return requests.get(`/news-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/news-admin/${id}`, body, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  },

  updateImage(id, body) {
    return requests.put(`/news-admin/image/${id}`, body, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  },

  deleteOne(id) {
    return requests.delete(`/news-admin/${id}`);
  },

  updateStatus(id, body) {
    return requests.put(`/news-admin/status/${id}`, body);
  },

  removeImageInList(id, index) {
    return requests.post(`/news-admin/remove-image/${id}`, { index });
  },
};

export default NewsServices;
