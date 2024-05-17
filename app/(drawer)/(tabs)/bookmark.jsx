import { View, Text, ImageBackground, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, router } from 'expo-router'

import { images } from '../../../constants'
import { DrawerActions } from '@react-navigation/native'

const Bookmark = () => {
  const navigation = useNavigation()
  return (
    <ImageBackground
      className='flex-1 justify-center items-center bg-primary'
    >
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text className='text-white'>
          Drawer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className='text-white'>
          Bar
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default Bookmark