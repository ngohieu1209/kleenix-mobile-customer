import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import { ScrollView } from 'react-native-gesture-handler'

import { bookingApi } from '../../services/api'
import useFetchData from '../../services/useFetchData'

import { Dropdown } from 'react-native-element-dropdown'

import EmptyState from '../../components/EmptyState'

import ActivityCard from '../../components/ActivityCard'
import FilterDateTimePicker from '../../components/FilterDateTimePicker'
import icons from '../../constants/icons'
import { useGlobalContext } from '../../context/GlobalProvider'

const tabs = [
  {
    id: 1,
    name: 'Đang chờ',
  },
  {
    id: 2,
    name: 'Đang thực hiện',
  },
  {
    id: 3,
    name: 'Đã hoàn thành',
  },
  {
    id: 4,
    name: 'Đã hủy',
  },
]

const Activities = () => {
  const [activateTab, setActivateTab] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('PENDING');
  const [isFilter, setIsFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const { authenticated } = useGlobalContext()

  const { data: listActivity, isLoading, refetch } = useFetchData(authenticated ? bookingApi.getListBooking(status, startDate, endDate) : null);
  const handleListActivity = (activateTab) => {
    setActivateTab(activateTab)
    if(activateTab === 1) setStatus('PENDING');
    if(activateTab === 2) setStatus('CONFIRMED,DELIVERY,WORKING');
    if(activateTab === 3) setStatus('COMPLETED');
    if(activateTab === 4) setStatus('CANCELLED_BY_CUSTOMER,CANCELLED_BY_KLEENIX');
  }
  
  const handleCloseFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setIsFilter(false);
  }
  
  // useEffect(() => {
  // }, [status, startDate, endDate])
  
  useFocusEffect(
    useCallback(() => {
      if(authenticated) {
        refetch();
      }
    }, [authenticated, status, startDate, endDate])
  )
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={listActivity}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if(isLoading) {
            return (
              <View className='mt-12'>
                <ActivityIndicator key={index} color={'#ffffff'} size={32} />
              </View>
            )
          }
          return <ActivityCard key={index} activity={item} />
        }}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-2'>
            <View className="flex justify-between items-center flex-row">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Hoạt động
                </Text>
              </View>

              <View className="">
                <Image
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            
            {isFilter ? (
              <View className='items-center'>
                <FilterDateTimePicker
                  title='Từ ngày'
                  value={startDate}
                  mode="date"
                  handleChangeDateTime={(selectedDate) => setStartDate(selectedDate)}
                />
                <FilterDateTimePicker 
                  title='Đến ngày'
                  value={endDate}
                  mode="date"
                  handleChangeDateTime={(selectedDate) => setEndDate(selectedDate)}
                  otherStyles='mt-4'
                />
                <TouchableOpacity
                  className='mt-4'
                  activeOpacity={0.7}
                  onPress={handleCloseFilter}
                >
                  <Image
                    source={icons.closeRound}
                    className='w-6 h-6'
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View className='flex-row justify-between'>
                <Dropdown 
                  className='w-[50%] h-12 px-4 bg-secondary rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
                  data={tabs}
                  placeholderStyle={{ color: '#FF9001' }}
                  placeholder=''
                  labelField="name"
                  valueField="id"
                  value={activateTab}
                  containerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10, borderColor: '#FF9001'}}
                  itemTextStyle={{ color: 'white' }}
                  activeColor='#1E1E2D'
                  itemContainerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10 }}
                  selectedTextStyle={{ color: 'black', fontWeight: '600' }}
                  onChange={item => {
                    handleListActivity(item.id)
                  }}
                />
                
                <TouchableOpacity
                  className='w-[50%] h-12 px-4 bg-secondary rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
                  activeOpacity={0.7}
                  onPress={() => setIsFilter(!isFilter)}
                >
                  <Text className='text-black text-base font-bold'>Lọc theo ngày</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className='mt-12'>
            <EmptyState 
              title="Không tìm thấy dữ liệu"
              subtitle="Chưa có đơn dịch vụ nào!"
            />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Activities