import requests from './httpService';

const PaymentServices = {
  addOne(body) {
    return requests.post('/payment-admin/add', body);
  },
  getAll({ page, limit, title, status }) {
    return requests.get(`/payment-admin?page=${page}&limit=${limit}&title=${title}&status=${status}`);
  },
  getById(id) {
    return requests.get(`/payment-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/payment-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/payment-admin/${id}`);
  },
  updateStatus(id, body) {
    return requests.put(`/payment-admin/status/${id}`, body);
  },

};

export default PaymentServices;
