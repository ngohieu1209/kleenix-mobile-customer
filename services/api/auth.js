import axios from 'axios';
import axiosInstance, { endpoints } from '../../utils/axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = {
  login: async (loginData) => {
    const { data } = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/login`, { ...loginData, phoneNumber: Number(loginData.phoneNumber).toString() });
    return data;
  },
  register: async (registerData) => {
    const { data } = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/register`, { ...registerData, phoneNumber: Number(registerData.phoneNumber).toString() });
    return data.result;
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
  },
  checkPhoneExist: async (eventData) => {
    const { data } = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/check-phone-exist`, { phoneNumber: Number(eventData.phoneNumber).toString() });
    return data.result;
  },
  verifyCodeForgotPassword: async (phoneNumber, eventData) => {
    const code = eventData.code1 + eventData.code2 + eventData.code3 + eventData.code4;
    const { data } = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/verify-code-forgot-password`, { phoneNumber: Number(phoneNumber).toString(), code: code });
    return data.result;
  },
  resetPassword: async (eventData) => {
    const { data } = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/reset-password`, eventData);
    return data.result;
  },
  resendSMSForgotPassword: async (eventData) => {
    const { data } = await axios.post(`${EXPO_PUBLIC_API_URL}/auth/resend-sms-forgot-password`, { phoneNumber: Number(eventData.phoneNumber).toString()});
    return data.result;
  },
}

export default authApi;