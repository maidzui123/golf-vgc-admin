import requests from './httpService';

const TournamentMediaServices = {
  addOne(body) {
    return requests.post('/tournamentmedia-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/tournamentmedia-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/tournamentmedia-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/tournamentmedia-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/tournamentmedia-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/tournamentmedia-admin/status/${id}`, body);
  },

};

export default TournamentMediaServices;
