import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalLine from './HorizontalLine'

const OrderModal = ({ visible, onClose, onSelect, order }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  console.log('winter-summer', order)
  
  const handleClose = () => {
    onClose()
  }

  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <View className='flex my-6 px-4 space-y-6'>
          <View className='flex-row'>
            <View className='flex-1'>
              <Text className='text-white font-pmedium text-base'>
                Đơn hàng
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image 
                source={icons.close}
                className='w-4 h-4'
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
        <View className='space-y-2'>
          <View className='flex-row space-x-2'>
            <Image 
              source={icons.location}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Địa chỉ làm việc
            </Text>
          </View>
          <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
            <Text className='text-sm text-gray-100 font-pregular mb-1'>Địa chỉ</Text>
            <Text className='text-base text-white font-pmedium'>Văn phòng - Tầng 5, 2 Dương Đình Nghệ, Yên Hoà, Nam Từ Niêm, Hà Nội, Việt Nam</Text>
            <HorizontalLine />
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

export default OrderModal