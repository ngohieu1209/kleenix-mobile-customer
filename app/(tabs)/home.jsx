import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../context/GlobalProvider'
import { serviceApi, promotionApi } from '../../services/api'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Promotion from '../../components/Promotion'
import EmptyState from '../../components/EmptyState'
import useFetchData from '../../services/useFetchData'
import ServiceCard from '../../components/ServiceCard'
import FinanceCard from '../../components/FinanceCard'
import { StatusBar } from 'expo-status-bar'
import LoadingScreen from '../../components/LoadingScreen'


const Home = () => {
  const { user, loading, authenticated } = useGlobalContext()
  const { data: listService, isLoading: loadingService, refetch } = useFetchData(authenticated ? serviceApi.getListService() : null);
  const { data: listPromotion, isLoading: loadingPromotion, refetch: refetchPromotion } = useFetchData(authenticated ? promotionApi.getList() : null);
  
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchPromotion();
    setRefreshing(false);
  }
  
  const refetchAll = async () => {
    await refetch();
    await refetchPromotion();
  }
  
  useFocusEffect(
    useCallback(() => {
      if(authenticated) {
        refetchAll();
      }
    }, [authenticated])
  )
  
  if(loading) {
    return <LoadingScreen />
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        numColumns={3}
        data={listService}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ServiceCard service={item} key={index}/>
        )}
        // columnWrapperStyle={{ justifyContent: 'space-around' }}
        columnWrapperStyle={{ gap: 30 }}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-6'>
            <View className='flex justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Xin Chào
                </Text>
                <Text className='text-2xl font-semibold text-white'>
                  {user?.name || 'User'}
                </Text>
              </View>
              
              <View className='mt-1.5'>
                <Image 
                  source={images.logo}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>
            
            <FinanceCard />
            
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Ưu đãi hot
              </Text>
              
              <Promotion promotions={listPromotion} />
            </View>
            
            <View className='w-full flex-1 pt-5'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Dịch Vụ
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="Không tìm thấy dữ liệu"
            subtitle="Vui lòng quay lại sau!"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default Home