import requests from './httpService';

const SearchKeywordServices = {
  addOne(body) {
    return requests.post('/searchkeyword-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/searchkeyword-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/searchkeyword-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/searchkeyword-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/searchkeyword-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/searchkeyword-admin/status/${id}`, body);
  },

};

export default SearchKeywordServices;
