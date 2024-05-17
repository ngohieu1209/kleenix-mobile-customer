import { View, Text, ScrollView, TouchableOpacity, Alert, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../context/GlobalProvider'
import useFetchData from '../../services/useFetchData'
import { icons } from '../../constants'

import BackButtonHeader from '../../components/BackButtonHeader'
import EmptyState from '../../components/EmptyState'
import AddressCard from '../../components/AddressCard'
import LocationModal from '../../components/LocationModal'

import { addressApi } from '../../services/api'

const Address = () => {
  const { user } = useGlobalContext()
  const [isLoading, setIsLoading] = useState(false);
  const { data: listAddress, refetch } = useFetchData(addressApi.getListAddress());
  const [refreshing, setRefreshing] = useState(false);
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  // const [showOptions, setShowOptions] = useState(false)
  
  const handleSelectCard = (id) => {
    setSelectedId(id === selectedId ? null : id)
  }
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  
  const handleSubmit = async (eventData) => {
    setIsLoading(true)
    try {
      const data = await addressApi.newAddress(eventData)
      listAddress.push(data)
      Alert.alert('Thành công', 'Thêm địa chỉ thành công')
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm địa chỉ')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <BackButtonHeader title={"Địa chỉ của tôi"} />
      <FlatList
        data={listAddress}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AddressCard 
            address={item} 
            key={index}
            showOptions={selectedId === item.id}  
            onToggleOptions={() => handleSelectCard(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="Không tìm thấy dữ liệu"
            subtitle="Vui lòng thêm địa chỉ!"
          />
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
            activeOpacity={0.7}
          >
            <View className='flex-row items-center justify-center space-x-2 px-4 py-2 bg-primary'>
              <Image 
                source={icons.plus}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-base text-white font-pmedium'>
                Thêm địa chỉ
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <LocationModal 
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={data => handleSubmit(data)}
      />
    </SafeAreaView>
  )
}

export default Address