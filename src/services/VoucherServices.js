import requests from './httpService';

const VoucherServices = {
  addOne(body) {
    return requests.post('/voucher-admin/add', body);
  },
  getAll(body) {
    return requests.post('/voucher-admin', body);
  },
  getById(id, body) {
    return requests.post(`/voucher-admin/${id}`, body);
  },

  updateOne(id, body) {
    return requests.put(`/voucher-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/voucher-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/voucher-admin/status/${id}`, body);
  },

};

export default VoucherServices;
