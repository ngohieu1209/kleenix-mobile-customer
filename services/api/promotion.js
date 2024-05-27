import axiosInstance, { endpoints } from '../../utils/axios';

const promotionApi = {
  getListUsable: async() => {
    const { data } = await axiosInstance.get(endpoints.promotion.usable);
    return data.result;
  },
  
  getList: async() => {
    const { data } = await axiosInstance.get(endpoints.promotion.list);
    return data.result;
  },
  
  claim: async(promotionId) => {
    const { data } = await axiosInstance.post(endpoints.promotion.claim, { promotionId });
    return data.result;
  }
}

export default promotionApi;