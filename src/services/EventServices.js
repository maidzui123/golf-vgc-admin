import requests from "./httpService";

const EventServices = {
  addOne(body) {
    return requests.post("/event-admin/add", body, { "Content-Type": "application/x-www-form-urlencoded" });
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
    return requests.get(`/event-admin?${queryString}`);
  },
  getById(id) {
    return requests.get(`/event-admin/${id}`);
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
    return requests.get(`/event-admin/all-customer-event/${id}?${queryString}`);
  },
  getCustomerEventById(id) {
    return requests.get(`/event-admin/customer-event/${id}`);
  },
  addOneCustomerEvent(body) {
    return requests.post("/event-admin/customer-event/add", body);
  },
  updateOneCustomerEvent(id, body) {
    return requests.post(`/event-admin/customer-event/update/${id}`, body);
  },
  updateOne(id, body) {
    return requests.post(`/event-admin/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },
  changeActive(id, body) {
    return requests.put(`/event-admin/active/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/event-admin/${id}`);
  },
  deleteMany(body) {
    return requests.post("/event-admin/delete/many", body);
  },
  updateStatus(id, body) {
    return requests.put(`/event-admin/status/${id}`, body);
  },
  removeImageInList(id, index) {
    return requests.post(`/event-admin/remove-image/${id}`, { index });
  },
};

export default EventServices;
