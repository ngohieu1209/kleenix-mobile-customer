import axiosInstance, { endpoints } from '../../utils/axios';

const bookingApi = {
  getListBooking: async(status, startDate=null, endDate=null) => {
    const { data } = await axiosInstance.get(`${endpoints.booking.list}?status=${status}&startDate=${startDate ? startDate : ''}&endDate=${endDate ? endDate : ''}`);
    return data.result;
  },
  newBooking: async(eventData) => {
    const { data } = await axiosInstance.post(endpoints.booking.new, eventData);
    return data.result;
  },
  cancelBooking: async(bookingId) => {
    const { data } = await axiosInstance.post(endpoints.booking.cancel, { bookingId });
    return data.result;
  }
}

export default bookingApi;