import requests from "./httpService";

const FlightResultServices = {
  addOne(body) {
    return requests.post("/flightresult-admin/add", body);
  },
  getAll({ page, limit }) {
    return requests.get(`/flightresult-admin?page=${page}&limit=${limit}`);
  },
  getById({id, tournamentId}) {
    return requests.get(`/flightresult-admin/${id}/${tournamentId}`);
  },
  getAllFlightInTour(tournamentId) {
    return requests.get(`/flightresult-admin/get-flight-tours/${tournamentId}`);
  },
  getAllCurrentFlightResult(tournamentId) {
    return requests.get(
      `/flightresult-admin/get-current-flight-result/${tournamentId}`
    );
  },
  getAllPlayerInTour(tournamentId) {
    return requests.get(
      `/flightresult-admin/get-current-player/${tournamentId}`
    );
  },
  updateOne(id, body) {
    return requests.post(`/flightresult-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/flightresult-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/flightresult-admin/status/${id}`, body);
  },
};

export default FlightResultServices;
