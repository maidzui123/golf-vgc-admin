import requests from './httpService';

const CustomerEventServices = {
  addOne(body) {
    return requests.post('/customerevent-admin/add', body);
  },
  getAll({ page, limit }) {
    return requests.get(`/customerevent-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customerevent-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customerevent-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customerevent-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/customerevent-admin/status/${id}`, body);
  },

  getEventCustomer(customer_id) {
    return requests.get(`/customerevent-admin/customer/${customer_id}`);
  },

};

export default CustomerEventServices;
