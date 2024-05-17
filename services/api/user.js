import axiosInstance, { endpoints } from '../../utils/axios';

const userApi = {
  getMe: async() => {
    const { data } = await axiosInstance.get(endpoints.user.getMe);
    return data.result;
  }
}

export default userApi;