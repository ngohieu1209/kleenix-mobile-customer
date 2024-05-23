import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../../context/GlobalProvider'
import { serviceApi } from '../../../services/api'

import { images } from '../../../constants'
import SearchInput from '../../../components/SearchInput'
import Trending from '../../../components/Trending'
import EmptyState from '../../../components/EmptyState'
import useFetchData from '../../../services/useFetchData'
import ServiceCard from '../../../components/ServiceCard'
import FinanceCard from '../../../components/FinanceCard'
import { StatusBar } from 'expo-status-bar'


const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: listService, refetch } = useFetchData(serviceApi.getListService());
  
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
        columnWrapperStyle={{ gap: 35 }}
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
              
              {/* <Trending posts={latestPosts} /> */}
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