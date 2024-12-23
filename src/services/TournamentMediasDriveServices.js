import requests from './httpService';

const TournamentMediasDriveServices = {
  addOne(body) {
    return requests.post('/tournamentmediasdrive-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/tournamentmediasdrive-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/tournamentmediasdrive-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/tournamentmediasdrive-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/tournamentmediasdrive-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/tournamentmediasdrive-admin/status/${id}`, body);
  },

};

export default TournamentMediasDriveServices;
