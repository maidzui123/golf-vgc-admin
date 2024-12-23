import requests from './httpService';

const CustomerTravelServices = {
  addOne(body) {
    return requests.post('/customertravel-admin/add', body);
  },
  getAll({ page, limit }) {
    return requests.get(`/customertravel-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customertravel-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customertravel-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customertravel-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/customertravel-admin/status/${id}`, body);
  },

  getTravelCustomer(customer_id) {
    return requests.get(`/customertravel-admin/customer/${customer_id}`);
  },

};

export default CustomerTravelServices;
