import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

import { fCurrency } from '../utils/format-currency'
import { fMinutesToHours, fDateTime, fDate } from '../utils/format-time'
import { getSocketInstance } from '../services/socket/socket-connection'
import { NOTIFICATION_TYPE } from '../constants/notification-type'

const NotificationCard = ({ notification }) => {
  const { id, body, booking, createdAt, isMark, type } = notification;
  
  const markAsRead = () => {
    const socket = getSocketInstance();
    if(type === NOTIFICATION_TYPE.REFUND) {
      socket.emit('mark-notification', { notificationId: id})
      router.push('home')
    } else {
      socket.emit('mark-notification', { notificationId: id})
      router.push('activities')
    }
  }
  
  return (
    <View>
      <TouchableOpacity
        className={`mb-6 mx-4 p-4 bg-black-100 rounded-2xl ${isMark ? '' : 'border-secondary-200 border'}`}
        activeOpacity={0.7}
        onPress={markAsRead}
      >
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center space-x-2'>
            <Text className='text-base text-white font-psemibold'>{type}</Text>
          </View>
          <View>
            {/* <Text className='text-base text-white font-psemibold'>ngày</Text> */}
          </View>
        </View>
        <View className='space-y-1 mt-2'>
          <Text className='text-white text-sm'>{body}</Text>
          <Text style={{ color: '#FCDC2A' }} className={`text-sm`}>{fDate(createdAt, 'Pp')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default NotificationCard