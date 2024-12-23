import requests from "./httpService";

const TournamentServices = {
  getTourForFlight() {
    return requests.get(`/tournament-admin/get-flight-tours`);
  },
  getAllFlightInTour(id) {
    return requests.get(`/tournament-admin/get-flight-tours/${id}`);
  },
  getAllFlightResult(id) {
    return requests.get(`/tournament-admin/get-flight-results/${id}`);
  },
  deleteMany(body) {
    return requests.post("/tournament-admin/delete/many", body);
  },
  addOne(body) {
    return requests.post("/tournament-admin/add", body);
  },
  getAll({ page, limit, search, status }) {
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

    if (status) {
      queryParams.push(`status=${status}`);
    }

    // Tạo chuỗi query hoàn chỉnh
    const queryString = queryParams.join("&");
    return requests.get(`/tournament-admin?${queryString}`);
  },

  getPlayers(id) {
    return requests.get(`/tournament-admin/players/${id}`);
  },
  getById(id) {
    return requests.get(`/tournament-admin/${id}`);
  },

  getFlightById(id) {
    return requests.get(`/tournament-admin/flight/${id}`);
  },
  getAllCustomer(id, { search, start_date, end_date }) {
    const queryParams = [];

    if (search) {
      queryParams.push(`search=${search}`);
    }

    if (start_date) {
      queryParams.push(`start_date=${start_date}`);
    }
    if (end_date) {
      queryParams.push(`end_date=${end_date}`);
    }
    const queryString = queryParams.join("&");
    return requests.get(
      `/tournament-admin/all-customer-tournament/${id}?${queryString}`
    );
  },
  getCustomerTournamentById(id) {
    return requests.get(`/tournament-admin/customer-tournament/${id}`);
  },
  addOneCustomerTournament(body) {
    return requests.post("/tournament-admin/customer-tournament/add", body);
  },
  updateOneCustomerTournament(id, body) {
    return requests.post(
      `/tournament-admin/customer-tournament/update/${id}`,
      body
    );
  },

  addOneFlight(body) {
    return requests.post("/tournament-admin/flight/add", body);
  },

  updateOneFlight(id, body) {
    return requests.post(`/tournament-admin/flight/update/${id}`, body);
  },

  updateOne(id, body) {
    return requests.post(`/tournament-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/tournament-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/tournament-admin/status/${id}`, body);
  },
  changeActive(id, body) {
    return requests.put(`/tournament-admin/active/${id}`, body);
  },
  getDashboardCount: async () => {
    return requests.get("/tournament-admin/dashboard-count");
  },
};

export default TournamentServices;
