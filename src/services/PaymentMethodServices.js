import requests from './httpService';

const PaymentMethodServices = {
  addOne(body) {
    return requests.post('/paymentmethod-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/paymentmethod-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/paymentmethod-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/paymentmethod-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/paymentmethod-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/paymentmethod-admin/status/${id}`, body);
  },

};

export default PaymentMethodServices;
