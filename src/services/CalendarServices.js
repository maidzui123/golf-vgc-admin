import requests from './httpService';

const CalendarServices = {
  addOne(body) {
    return requests.post('/calendar-admin/add', body);
  },
  getAll({page, limit}) {
    return requests.get(`/calendar-admin?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return requests.get(`/calendar-admin/${id}`);
  },

  updateOne(id, body) {
    return requests.post(`/calendar-admin/${id}`, body);
  },
  deleteOne(id) {
    return requests.delete(`/calendar-admin/${id}`);
  },
    updateStatus(id, body) {
    return requests.put(`/calendar-admin/status/${id}`, body);
  },

};

export default CalendarServices;
