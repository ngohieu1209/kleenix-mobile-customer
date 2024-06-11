import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { REACT_APP_BASE_ICON_URL } from '@env'
import { router } from 'expo-router'

import { fCurrency } from '../utils/format-currency'
import { fMinutesToHours, fDateTime } from '../utils/format-time'
import colorStatus from '../constants/color-status'
import BookingModal from './BookingModal'
import { bookingApi } from '../services/api'
import Toast from 'react-native-toast-message'

const ActivityCard = ({ activity }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  const { id, createdAt, duration, note, dateTime, totalPrice, status, address, bookingPackage, paymentStatus } = activity;
  const { service } = bookingPackage[0].package;
  const { body: statusBody, color: statusColor } = colorStatus(status);
  const iconURL = `${REACT_APP_BASE_ICON_URL}/${service.icon}`
  
  const submit = async () => {
    setIsLoading(true)
    try {
      await bookingApi.cancelBooking(id);
      router.replace('/activities')
    } catch (error) {
      console.log('cancel-booking-error', error)
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra khi hủy đơn',
      });
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <View>
      <TouchableOpacity
        className='mb-6 mx-4 p-4 bg-black-100 rounded-2xl'
        activeOpacity={0.7}
        onPress={() => setIsVisibleModalLocation(true)}
        >
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center space-x-2'>
            <Image 
              source={{ uri: iconURL }}
              className='w-6 h-6'
              resizeMode='cover'
            />
            <Text className='text-base text-white font-psemibold'>{service.name}</Text>
          </View>
          <View>
            <Text className='text-base text-white font-psemibold'>{paymentStatus === 'KPAY' ? fCurrency(Number(0)) : fCurrency(Number(totalPrice))}</Text>
          </View>
        </View>
        <View className='space-y-1 mt-2'>
          <Text className='text-white text-sm'>Bắt đầu: {fDateTime(dateTime)}</Text>
          <Text className='text-white text-sm'>Thực hiện: {fMinutesToHours(duration)}</Text>
          <Text style={{ color: `${statusColor}` }} className={`text-sm`}>{statusBody}</Text>
        </View>
      </TouchableOpacity>
      <BookingModal
        service={service}
        activity={activity}
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={submit}
      />
    </View>
  )
}

export default ActivityCard