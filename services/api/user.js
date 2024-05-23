import axiosInstance, { endpoints } from '../../utils/axios';

const userApi = {
  getMe: async() => {
    const { data } = await axiosInstance.get(endpoints.user.getMe);
    return data.result;
  },
  requestPayment: async(amount) => {
    const { data } = await axiosInstance.post(endpoints.user.requestPayment, { amount });
    return data.result;
  },
  paymentSuccess: async(amount) => {
    const { data } = await axiosInstance.post(endpoints.user.paymentSuccess, { amount });
    return data.result;
  }
}

export default userApi;