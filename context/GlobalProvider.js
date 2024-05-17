import { createContext, useContext, useState, useEffect } from 'react'
import { userApi } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchDataGetMe = async() => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if(accessToken) {
        const user = await userApi.getMe();
        setIsLoggedIn(true);
        setUser(user)
      }
    } catch (error) {
      console.log('winter-error', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchDataGetMe();
  }, [isLoggedIn])
  
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider