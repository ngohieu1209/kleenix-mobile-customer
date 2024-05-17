import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { icons } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

import BackButtonHeader from '../../components/BackButtonHeader'
import EnterNumber from '../../components/EnterNumber'
import CustomButton from '../../components/CustomButton'
import LoadingModal from '../../components/LoadingModal'

const Verification = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <BackButtonHeader />
      <View className='w-full px-4'>
        <Text
          className='text-2xl text-white text-semibold mt-10 font-psemibold'
        >
          Verification
        </Text>
        <Text className='font-pmedium text-sm text-gray-100 mt-2'>
          We've send you the verification code on {"098867850"}. Please enter the code below
        </Text>
        <View 
          className='flex-row justify-between mt-10 space-x-4 w-full items-center'
        >
          <EnterNumber placeholder="-"/>
          <EnterNumber placeholder="-"/>
          <EnterNumber placeholder="-"/>
          <EnterNumber placeholder="-"/>
        </View>
        
        <CustomButton 
          title='Continue'
          // handlePress={submit}
          containerStyles='mt-16'
          // isLoading={uploading}
        />
        
        <View className='flex-row justify-center mt-4'>
          <Text className='font-pmedium text-sm text-gray-100 mt-2'>
            Resend code in {' '}
          </Text>
          {/* <Text className='font-pmedium text-sm text-gray-50 mt-2'>
            00:20
          </Text> */}
          <TouchableOpacity>
            <Text className='font-pmedium text-sm text-yellow-400 mt-2'>
              Gửi lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingModal visible={false} />
    </SafeAreaView>
  )
}

export default Verification