import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { EXPO_PUBLIC_BASE_ICON_URL } from '@env'

import { useGlobalContext } from '../../context/GlobalProvider'

import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

import HorizontalLine from '../../components/HorizontalLine'
import Toast from 'react-native-toast-message';

const Profile = () => {
  const iconBaseURL = `${EXPO_PUBLIC_BASE_ICON_URL}`
  const { logout, user } = useGlobalContext()
  
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('sign-in')
    } catch (error) {
      console.log('logout-error', error.message)
    }
  }
  
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Đăng ký thành công',
    });
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='w-full justify-center items-center mt-6 px-4'>
        <View className='w-full flex-row justify-end mb-10'>
          <TouchableOpacity
            onPress={handleLogout}
          >
            <Image 
              source={icons.logout}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
        
        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
          {user && user.avatar ? (
            <Image 
              source={{ uri: `${iconBaseURL}/${user.avatar}` }}
              className='w-[90%] h-[90%] rounded-lg'
              resizeMode='cover'
            />
          ) : (
            <Image 
              source={icons.profile}
              className='w-[90%] h-[90%] rounded-lg'
              resizeMode='cover'
            />
          )}
        </View>
        
        <InfoBox 
          title={user && user.name}
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
                source={icons.wallet}
                className='w-6 h-6'
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
          onPress={() => router.push('/address')}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.homeAddress}
                className='w-6 h-6'
                resizeMode='contain'
              />
              <Text className='text-white text-base font-pmedium'>
                Địa chỉ
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
          onPress={() => router.push('edit-information')}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.pen}
                className='w-5 h-5'
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
          onPress={showToast}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.helpDesk}
                className='w-6 h-6'
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
          source={icons.facebook}
          className='w-8 h-8'
          resizeMode='contain'
        />
        <Image 
          source={icons.tiktok}
          className='w-9 h-9'
          resizeMode='contain'
        />
        <Image 
          source={icons.zalo}
          className='w-9 h-9'
          resizeMode='contain'
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile