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
  },
  editProfile: async(eventData) => {
    const formData = new FormData();
    if(eventData.avatar) {
      formData.append('avatar', {
        uri: eventData.avatar,
        type: "image/png",
        name: 'customer-avatar'
      });
    }
    formData.append('name', eventData.name);
    const { data } = await axiosInstance.patch(endpoints.user.edit, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data.result;
  }
}

export default userApi;