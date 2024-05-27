import axios from 'axios';
import axiosInstance, { endpoints } from '../../utils/axios';
import { REACT_APP_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = {
  login: async (loginData) => {
    const { data } = await axios.post(`${REACT_APP_API_URL}/auth/login`, loginData);
    const token = data.result.token
    await AsyncStorage.setItem('accessToken', token.accessToken);
    await AsyncStorage.setItem('refreshToken', token.refreshToken);
    return data;
  },
  logout: async() => {
    const { data } = await axiosInstance.post(endpoints.auth.logout)
    return data
  },
  verify: async(eventData) => {
    const code = eventData.code1 + eventData.code2 + eventData.code3 + eventData.code4;
    const { data } = await axiosInstance.post(endpoints.auth.verify, { code });
    return data.result;
  },
  resendSMS: async () => {
    const { data } = await axiosInstance.post(endpoints.auth.resendSMS);
    return data.result;
  },
  changePassword: async(eventData) => {
    const { data } = await axiosInstance.post(endpoints.auth.changePassword, eventData)
    return data.result
  }
}

export default authApi;