import requests from './httpService';

const TravelServices = {
  addOne(body) {
    return requests.post('/travel-admin/add', body, { "Content-Type": "application/x-www-form-urlencoded" });
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

    const queryString = queryParams.join("&");

    return requests.get(`/travel-admin?${queryString}`);
  },

  getById(id) {
    return requests.get(`/travel-admin/${id}`);
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

    return requests.get(`/travel-admin/all-customer-travel/${id}?${queryString}`);
  },
  updateOne(id, body) {
    return requests.post(`/travel-admin/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },
  deleteOne(id) {
    return requests.delete(`/travel-admin/${id}`);
  },
  deleteMany(body) {
    return requests.post("/travel-admin/delete/many", body);
  },
  updateStatus(id, body) {
    return requests.put(`/travel-admin/status/${id}`, body);
  },

  getDashboardCount: async () => {
    return requests.get("/travel-admin/dashboard-count");
  },
  getCustomerTravelById(id) {
    return requests.get(`/travel-admin/customer-travel/${id}`);
  },
  addOneTravelCustomer(body) {
    return requests.post('/travel-admin/customer-travel/add', body);
  },
  changeActive(id, body) {
    return requests.put(`/travel-admin/active/${id}`, body);
  },
  updateOneTravelCustomer(id, body) {
    return requests.post(`/travel-admin/customer-travel/update/${id}`, body);
  },

  removeImageInList(id, index) {
    return requests.post(`/travel-admin/remove-image/${id}`, { index });
  },
};

export default TravelServices;
