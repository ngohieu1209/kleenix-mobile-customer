import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: EXPO_PUBLIC_API_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    verify: '/auth/verify',
    resendSMS: '/auth/resend-sms',
    changePassword: '/auth/change-password',
    checkPhone: '/auth/check-phone-exist',
    verifyForgotPassword: '/auth/verify-code-forgot-password',
    resetPassword: '/auth/reset-password',
    resendSMSForgotPassword: '/auth/resend-sms-forgot-password',
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
  },
  promotion: {
    list: '/promotion/list',
    usable: '/promotion/list/usable',
    claim: '/promotion/claim'
  },
  feedback: {
    detail: '/feedback',
    new: '/feedback/new'
  }
};