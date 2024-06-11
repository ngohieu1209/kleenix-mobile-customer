import { useState, useEffect } from "react"
import Toast from "react-native-toast-message"

const useFetchData = (fn) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fn
      setData(response)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Có lỗi xảy ra',
      });
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    if(fn)
      fetchData()
  }, [])
  
  const refetch = () => fetchData()
  
  return { data, isLoading, refetch }
}

export default useFetchData