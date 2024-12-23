import requests from "./httpService";

const CustomerServices = {
  getAllCustomers: async ({ searchText }) => {
    return requests.get(`/customer?searchText=${searchText}`);
  },

  addAllCustomers: async (body) => {
    return requests.post("/customer/add/all", body);
  },
  // user create
  createCustomer: async (body) => {
    return requests.post(`/customer/create`, body);
  },

  filterCustomer: async (email) => {
    return requests.post(`/customer/filter/${email}`);
  },

  getCustomerById: async (id) => {
    return requests.get(`/customer/${id}`);
  },

  getCustomerDetailedById: async (id) => {
    return requests.get(`/customer/detailed/${id}`);
  },

  updateCustomer: async (id, body) => {
    return requests.put(`/customer/${id}`, body);
  },

  updateAdminCustomer: async (id, body) => {
    return requests.put(`/customer/admin-update/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },

  deleteCustomer: async (id) => {
    return requests.delete(`/customer/${id}`);
  },

  getDashboardCount: async () => {
    return requests.get("/customer/dashboard-count");
  },

  getDashboardRecentCustomer: async ({ page, limit }) => {
    return requests.get(`/customer/dashboard-recent-customer?page=${page}&limit=${limit}`);
  },

  updateImage(id, body) {
    return requests.put(`/customer/image/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },

  removeImage(id) {
    return requests.put(`/customer/remove-image/${id}`);
  },

  getAll({ page, limit, search, tick_status, level }) {
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

    if (tick_status) {
      queryParams.push(`tick_status=${tick_status}`);
    }

    if (level) {
      queryParams.push(`level=${level}`);
    }

    const queryString = queryParams.join("&");

    return requests.get(`/customer/get-all?${queryString}`);
  },
};

export default CustomerServices;
