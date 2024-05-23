import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'

import { icons } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authApi } from '../../services/api'
import { useGlobalContext } from '../../context/GlobalProvider'

import BackButtonHeader from '../../components/BackButtonHeader'
import EnterNumber from '../../components/EnterNumber'
import CustomButton from '../../components/CustomButton'
import LoadingModal from '../../components/LoadingModal'

const Verification = () => {
  const [form, setForm] = useState({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  useEffect(() => {
    let interval;
    if (timeLeft === 0) {
      setTimeLeft(null);
    } else if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResendClick = async () => {
    await authApi.resendSMS();
    setTimeLeft(120); // 2 phút = 120 giây
  };
  
  const submit = async () => {
    if(!form.code1 || !form.code2 || !form.code3 || !form.code4) {
      Alert.alert('Lỗi', 'Hãy điền đầy đủ mã xác thực')
    }
    setIsSubmitting(true)
    
    try {
      const data = await authApi.verify(form)
      setUser(data);
      setIsLoggedIn(true)
      if(!data.verify) {
        return router.replace('/verification')
      } else {
        return router.replace('/home')
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  
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
          <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code1: e })}/>
          <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code2: e })}/>
          <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code3: e })}/>
          <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code4: e })}/>
        </View>
        
        <CustomButton 
          title={isSubmitting ? <ActivityIndicator color={'#CDCDE0'} size={32} /> : 'Continue'}
          handlePress={submit}
          containerStyles='mt-16'
          isLoading={isSubmitting}
        />
        
        <View className='flex-row justify-center mt-4'>
          <Text className='font-pmedium text-sm text-gray-100 mt-2'>
            Resend code in {' '}
          </Text>
          {timeLeft !== null ? (
            <Text className='font-pmedium text-sm text-gray-50 mt-2'>
              {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
            </Text>
          ) : (
            <TouchableOpacity 
              onPress={handleResendClick}
              activeOpacity={0.7}
            >
              <Text className='font-pmedium text-sm text-yellow-400 mt-2'>
                Gửi lại
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <LoadingModal visible={false} /> */}
    </SafeAreaView>
  )
}

export default Verification