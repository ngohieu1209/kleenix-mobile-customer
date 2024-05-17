import axiosInstance, { endpoints } from '../../utils/axios';

const serviceApi = {
  getListService: async() => {
    const { data } = await axiosInstance.get(endpoints.service.list);
    return data.result;
  },
  
  getListPackage: async(serviceId) => {
    const { data } = await axiosInstance.get(`${endpoints.service.root}/${serviceId}`);
    return data.result;
  }
}

export default serviceApi;