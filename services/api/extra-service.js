import axiosInstance, { endpoints } from '../../utils/axios';

const extraServiceApi = {
  getListExtraService: async() => {
    const { data } = await axiosInstance.get(endpoints.extraService.list);
    return data.result;
  },
}

export default extraServiceApi;