import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import axios from 'axios';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: REACT_APP_API_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken && accessToken) {
        try {
          const res = await axiosInstance.post(`/auth/refresh-token`, { refreshToken, accessToken });
          if (res.status === 200 || res.status === 201) {
            await AsyncStorage.setItem('accessToken', res.data.result.accessToken);
            await AsyncStorage.setItem('refreshToken', res.data.result.refreshToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.result.accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          return Promise.reject((err.response && err.response.data) || 'Something went wrong')
        }
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    verify: '/auth/verify',
    resendSMS: '/auth/resend-sms',
  },
  user: {
    getMe: '/customer/get-me',
    edit: '/customer/edit',
    requestPayment: '/customer/request-payment',
    paymentSuccess: '/customer/payment-success',
  },
  service: {
    list: '/service/list',
    root: '/service'
  },
  extraService: {
    list: '/extra-service/list'
  },
  address: {
    new: '/address/new',
    list: '/address/list',
    root: '/address'
  },
  booking: {
    new: '/booking/new',
    cancel: '/booking/cancel',
    list: '/booking/list',
    detail: '/booking/detail',
  }
};