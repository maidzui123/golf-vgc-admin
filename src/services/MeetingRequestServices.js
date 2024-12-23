import requests from './httpService';

const MeetingRequestServices = {
  addOne(body) {
    return requests.post('/meetingrequest-admin/add', body);
  },
  getAll({ page, limit }) {
    return requests.get(`/meetingrequest-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/meetingrequest-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/meetingrequest-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/meetingrequest-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/meetingrequest-admin/status/${id}`, body);
  },
  getAllOfCustomer(customer_id) {
    return requests.get(`/meetingrequest-admin/get-all-of-customer/${customer_id}`);
  },
};

export default MeetingRequestServices;
