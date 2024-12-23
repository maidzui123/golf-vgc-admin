import requests from "./httpService";

const FlightServices = {
  addOne(body) {
    return requests.post("/flight-admin/add", body);
  },
  getAll({ page, limit }) {
    return requests.get(`/flight-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/flight-admin/${id}`);
  },
  getPlayer(id) {
    return requests.get(`/flight-admin/get-player/${id}`);
  },

  getAllFlightInTour(tournamentId) {
    return requests.get(`/flight-admin/get-flight-tours/${tournamentId}`);
  },
  getCurrentPlayer({ tournamentId, flightId }) {
    return requests.get(
      `/flight-admin/get-current-player/${tournamentId}/${flightId}`
    );
  },
  updateOne(id, body) {
    return requests.post(`/flight-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/flight-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/flight-admin/status/${id}`, body);
  },
};

export default FlightServices;
