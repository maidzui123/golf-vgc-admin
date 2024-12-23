import requests from './httpService';

const CustomerTournamentFavouriteServices = {
  addOne(body) {
    return requests.post('/customertournamentfavourite-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/customertournamentfavourite-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customertournamentfavourite-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customertournamentfavourite-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customertournamentfavourite-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/customertournamentfavourite-admin/status/${id}`, body);
  },

};

export default CustomerTournamentFavouriteServices;
