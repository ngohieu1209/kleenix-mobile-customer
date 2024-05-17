import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../../constants/images'
import { ScrollView } from 'react-native-gesture-handler'

import { bookingApi } from '../../../services/api'
import useFetchData from '../../../services/useFetchData'

import ActivityCard from '../../../components/ActivityCard'

const tabs = ['Đang chờ', 'Đang thực hiện', 'Đã hoàn thành', 'Đã hủy']
const Activities = () => {
  const [activateTab, setActivateTab] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('PENDING,DELAYED');
  const { data: listActivity, refetch } = useFetchData(bookingApi.getListBooking(status, startDate, endDate));
  const scrollViewRef = useRef();
  const scrollPositionRef = useRef(0);
  
  const handleTabPress = (index) => {
    if (index !== activateTab) {
      setActivateTab(index);
      // const tabWidth = 200; // Giả sử mỗi tab có chiều rộng là 100px, điều chỉnh theo thực tế
      // const scrollToX = tabWidth * index; // Tính toán vị trí x dựa trên index của tab
      // scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
    }
  };
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={listActivity}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <ActivityCard key={index} activity={item} />
        )}
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
            
            <FlatList 
              data={tabs}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={activateTab}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  className={`px-4 py-2 rounded-full ${activateTab === index ? 'bg-secondary' : 'bg-black-100'}`}
                  onPress={() => handleTabPress(index)}
                >
                  <Text className={`text-sm font-pmedium ${activateTab === index ? 'text-black-100' : 'text-gray-100'}`}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              className="flex-row gap-4"
              ref={scrollViewRef}
              onScroll={(event) => {
                scrollPositionRef.current = event.nativeEvent.contentOffset.x; // Cập nhật ref thay vì state
              }}
              scrollEventThrottle={16}
            >
              {tabs.map((tab, index) => (
                <Pressable 
                  key={index}
                  className={`px-4 py-2 rounded-full ${activateTab === index ? 'bg-secondary' : 'bg-black-100'}`}
                  onPress={() => handleTabPress(index)}
                >
                  <Text className={`text-sm font-pmedium ${activateTab === index ? 'text-black-100' : 'text-gray-100'}`}>
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Activities