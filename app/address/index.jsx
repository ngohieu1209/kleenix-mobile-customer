import { View, Text, ScrollView, TouchableOpacity, Alert, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../context/GlobalProvider'
import useFetchData from '../../services/useFetchData'
import { icons } from '../../constants'

import BackButtonHeader from '../../components/BackButtonHeader'
import EmptyState from '../../components/EmptyState'
import AddressCard from '../../components/AddressCard'
import LocationModal from '../../components/LocationModal'

import { addressApi } from '../../services/api'
import LoadingScreen from '../../components/LoadingScreen'

const Address = () => {
  const { authenticated } = useGlobalContext()

  const [isHandleLoading, setIsHandleLoading] = useState(false);
  const { data: listAddress, refetch } = useFetchData(authenticated ? addressApi.getListAddress() : null);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  
  useEffect(() => {
    refetch()
  }, [isHandleLoading])
  
  const handleSelectCard = (id) => {
    setSelectedId(id === selectedId ? null : id)
  }
  
  const handleSetDefault = async (id) => {
    setIsHandleLoading(true);
    try {
      await addressApi.setDefault(id);
    } catch (error) {
      Alert.alert('Error', 'Có lỗi xảy ra, vui lòng thử lại sau');
      console.log('winter-set-default-address-error', error);
    } finally {
      setIsHandleLoading(false);
    }
  }
  
  const handleDelete = async (id) => {
    setIsHandleLoading(true);
    try {
      await addressApi.deleteAddress(id);
    } catch (error) {
      Alert.alert('Error', 'Có lỗi xảy ra, vui lòng thử lại sau');
      console.log('winter-delete-address-error', error);
    } finally {
      setIsHandleLoading(false);
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  
  const handleSubmit = async (eventData) => {
    setIsHandleLoading(true)
    try {
      const data = await addressApi.newAddress(eventData)
      listAddress.push(data)
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm địa chỉ')
    } finally {
      setIsHandleLoading(false)
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
            showOptions={selectedId === item.id && !item.isDefault}
            onToggleOptions={() => handleSelectCard(item.id)}
            isLoading={isHandleLoading}
            onDelete={() => handleDelete(item.id)}
            onDefault={() => handleSetDefault(item.id)}
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