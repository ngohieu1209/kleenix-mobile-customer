import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'

import { useGlobalContext } from '../../../context/GlobalProvider'

import { icons } from '../../../constants'
import InfoBox from '../../../components/InfoBox'

import { AntDesign } from '@expo/vector-icons';
import HorizontalLine from '../../../components/HorizontalLine'

const Profile = () => {
  const navigation = useNavigation()
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    
    router.replace('/sign-in')
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='w-full justify-center items-center mt-6 px-4'>
        <View className='w-full flex-row justify-between mb-10'>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <AntDesign name="menu-unfold" size={24} color="#98E4FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
          >
            <Image 
              source={icons.logout}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
        
        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
          <Image 
            source={icons.profile}
            className='w-[90%] h-[90%] rounded-lg'
            resizeMode='cover'
          />
        </View>
        
        <InfoBox 
          title={user.name}
          containerStyles='mt-5'
          titleStyles='text-lg'
        />
        
      </View>
      <View className='mt-4'>
        <HorizontalLine />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/payment')}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.profile}
                className='w-4 h-4'
                resizeMode='contain'
              />
              <Text className='text-white text-base font-pmedium'>
                Nạp kPay
              </Text>
            </View>
            <Image 
              source={icons.rightContinue}
              className='w-4 h-4 mr-2'
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
        <HorizontalLine />
        <TouchableOpacity
          activeOpacity={0.7}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.profile}
                className='w-4 h-4'
                resizeMode='contain'
              />
              <Text className='text-white text-base font-pmedium'>
                Chỉnh sửa thông tin
              </Text>
            </View>
            <Image 
              source={icons.rightContinue}
              className='w-4 h-4 mr-2'
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
        <HorizontalLine />
        <TouchableOpacity
          activeOpacity={0.7}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.profile}
                className='w-4 h-4'
                resizeMode='contain'
              />
              <Text className='text-white text-base font-pmedium'>
                Trợ giúp
              </Text>
            </View>
            <Image 
              source={icons.rightContinue}
              className='w-4 h-4 mr-2'
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
        <HorizontalLine />
      </View>
      <View className='flex-row mt-4 justify-center space-x-10'>
        <Image 
          source={icons.profile}
          className='w-6 h-6'
          resizeMode='contain'
        />
        <Image 
          source={icons.profile}
          className='w-6 h-6'
          resizeMode='contain'
        />
        <Image 
          source={icons.profile}
          className='w-6 h-6'
          resizeMode='contain'
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile