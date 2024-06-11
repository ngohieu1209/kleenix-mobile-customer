import { createContext, useContext, useState, useEffect, useReducer, useCallback, useMemo } from 'react'
import { router } from 'expo-router'
import axiosInstance, { endpoints } from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSession, isValidToken } from '../utils/jwt';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if(action.type === 'UPDATE') {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.payload,
      },
    };
  }
  return state;
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const initialize = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (accessToken && isValidToken(accessToken)) {
        const token = {
          accessToken,
          refreshToken,
        };
        setSession(token);

        const response = await axiosInstance.get(endpoints.user.getMe)

        const user = response.data.result;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [router]);
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  // LOGIN
  const login = useCallback(async (phoneNumber, password) => {
    const data = {
      phoneCode: '84',
      phoneNumber: Number(phoneNumber).toString(),
      password,
    };

    const response = await axiosInstance.post(endpoints.auth.login, data);

    const { token, user } = response.data.result;

    setSession(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
        },
      },
    });
    
    if(!user.verify) {
      return router.replace('/verification')
    } else if(user.verify) {
      return router.replace('/home')
    }
  }, []);
  
  // LOGOUT
  const logout = useCallback(async () => {
    await axiosInstance.post(endpoints.auth.logout);
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);
  
  // UPDATE USER
  const updateUser = (payload) => {
    dispatch({
      type: 'UPDATE',
      payload,
    });
  }
  
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      updateUser
    }),
    [login, logout, updateUser, state.user, status]
  );
  
  return (
    <GlobalContext.Provider
      value={memoizedValue}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider