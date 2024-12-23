import requests from './httpService';

const CustomerTournamentServices = {
  addOne(body) {
    return requests.post('/customertournament-admin/add', body);
  },
  getAll({ page, limit }) {
    return requests.get(`/customertournament-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/customertournament-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/customertournament-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/customertournament-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/customertournament-admin/status/${id}`, body);
  },

  getTournamentCustomer(customer_id) {
    return requests.get(`/customertournament-admin/customer/${customer_id}`);
  },

};

export default CustomerTournamentServices;
