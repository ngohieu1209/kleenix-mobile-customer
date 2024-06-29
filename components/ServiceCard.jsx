import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { images } from '../constants'
import { icons } from '../constants'
import { EXPO_PUBLIC_BASE_ICON_URL } from '@env'
import { fShortenString } from '../utils/format-string'

const ServiceCard = ({ service: { id, name, icon } }) => {
  const iconURL = `${EXPO_PUBLIC_BASE_ICON_URL}/${icon}`
  
  return (
    <TouchableOpacity 
      className='flex-col items-center px-4 mb-14'
      activeOpacity={0.7}
      onPress={() => router.push({
        pathname: '/service',
        params: { id }
      })}
    >
      <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
        <Image 
          source={{ uri: iconURL }}
          className='w-full h-full rounded-lg'
          resizeMode='cover'
        />
      </View>
      
      <View className='pt-2'>
        <Text className='text-white font-psemibold text-xs' numberOfLines={1}>
          {fShortenString(name)}
        </Text>
      </View>
{/*       
      <TouchableOpacity
        activeOpacity={0.7}
        className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
      >
        <Image 
          source={{ uri: thumbnail }}
          className='w-full h-full rounded-xl mt-3'
          resizeMode='cover'
        />
      </TouchableOpacity> */}
    </TouchableOpacity>
  )
}

export default ServiceCard