import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { icons } from '../constants'

const BackButtonHeader = ({ title }) => {
  return (
    <View className='flex-row gap-6 px-6 py-4 items-center'>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Image 
          source={icons.leftArrow}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
      <Text className='text-white font-pmedium text-base'>{title}</Text>
    </View>
  )
}

export default BackButtonHeader 