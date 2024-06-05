import axiosInstance from './axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'core-js/stable/atob'
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------
export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');

    router.replace('sign-in')
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (token) => {
  if (token) {
    const { accessToken, refreshToken } = token;
    AsyncStorage.setItem('accessToken', accessToken);
    AsyncStorage.setItem('refreshToken', refreshToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(refreshToken);
    tokenExpired(exp);
  } else {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');

    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
