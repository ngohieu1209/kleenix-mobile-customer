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
      <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
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
        
        <View className='mt-5 flex-row'>
          <InfoBox 
            title={0}
            subtitle='Posts'
            containerStyles='mr-10'
            titleStyles='text-xl'
          />
          <InfoBox 
            title={"1.2k"}
            subtitle='Followers'
            titleStyles='text-xl'
          />
        </View>
        
        <View className='mt-5'>
          <TouchableOpacity>
            <View className='w-36 h-12 bg-secondary rounded-lg justify-center items-center mt-5'>
              <Text className='text-white font-pmedium'>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile