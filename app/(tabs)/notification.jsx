import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getSocketInstance } from '../../services/socket/socket-connection'

import EmptyState from '../../components/EmptyState'

import NotificationCard from '../../components/NotificationCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Notification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listNotification, setListNotification] = useState([]);
  const { authenticated } = useGlobalContext()
  
  useFocusEffect(
    useCallback(() => {
      if(authenticated) {
        setIsLoading(true);
        const socket = getSocketInstance();
        socket.emit('customer-notifications')
        socket.on('list-notification', (payload) => {
          setListNotification(payload);
        })
        setIsLoading(false);
      }
    }, [authenticated])
  )
  
  const maskAsReadAll = useCallback(() => {
    const socket = getSocketInstance();
    socket.emit('mark-all-notification')
  }, [listNotification])
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={listNotification}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if(isLoading) {
            return (
              <View className='mt-12'>
                <ActivityIndicator key={index} color={'#ffffff'} size={32} />
              </View>
            )
          }
          return <NotificationCard key={index} notification={item} />
        }}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-2'>
            <View className="flex justify-between items-center flex-row">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Thông báo
                </Text>
              </View>

              <TouchableOpacity 
                className=""
                activeOpacity={0.7}
                onPress={maskAsReadAll}
              >
                <Text className="text-sm font-psemibold text-secondary-100">
                  Đánh dấu đọc tất cả
                </Text>
              </TouchableOpacity>
            </View>
            
            
          </View>
        )}
        ListEmptyComponent={() => (
          <View className='mt-12'>
            <EmptyState 
              title="Không tìm thấy dữ liệu"
              subtitle="Vui lòng quay lại sau!"
            />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Notification