import axiosInstance, { endpoints } from '../../utils/axios';

const addressApi = {
  getListAddress: async() => {
    const { data } = await axiosInstance.get(endpoints.address.list);
    return data.result;
  },
  newAddress: async(eventData) => {
    eventData.lat = '21.028511';
    eventData.long = '105.804817';
    const { data } = await axiosInstance.post(endpoints.address.new, eventData);
    return data.result;
  },
  setDefault: async(addressId) => {
    const { data } = await axiosInstance.post(`${endpoints.address.root}/set-default`, { addressId });
    return data.result;
  },
  deleteAddress: async(addressId) => {
    const { data } = await axiosInstance.delete(`${endpoints.address.root}/${addressId}`);
    return data.result;
  }
}

export default addressApi;