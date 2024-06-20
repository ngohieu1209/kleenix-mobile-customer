import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'
import _ from 'lodash'

import { SafeAreaView } from 'react-native-safe-area-context'
import { authApi } from '../../services/api'
import ResetPasswordModal from '../../components/ResetPasswordModal'

import BackButtonHeader from '../../components/BackButtonHeader'
import EnterNumber from '../../components/EnterNumber'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import Toast from 'react-native-toast-message'

const ForgotPassword = () => {
  const [form, setForm] = useState({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  })
  const [formPhoneNumber, setFormPhoneNumber] = useState({
    phoneNumber: ''
  })
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120);

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
    await authApi.resendSMSForgotPassword({ phoneNumber: formPhoneNumber.phoneNumber });
    setTimeLeft(120); // 2 phút = 120 giây
  };
  
  const submitVerificationPhone = async () => {
    if(!formPhoneNumber.phoneNumber) {
      Toast.show({
        type: 'error',
        text1: 'Hãy điền số điện thoại của bạn',
      });
      return
    }
    setIsSubmitting(true)
    
    try {
      await authApi.checkPhoneExist(formPhoneNumber)
      setVerifyPhoneNumber(true)
    } catch (error) {
      console.log('login-error', _.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message)
      ToastAndroid.show(_.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message, ToastAndroid.LONG);
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const submitVerificationCode = async () => {
    if(!form.code1 || !form.code2 || !form.code3 || !form.code4) {
      Toast.show({
        type: 'error',
        text1: 'Hãy điền đầy đủ mã',
      });
      return
    }
    setIsSubmitting(true)
    
    try {
      await authApi.verifyCodeForgotPassword(formPhoneNumber.phoneNumber, form)
      setIsVisibleModal(true)
    } catch (error) {
      console.log('login-error', error.response.data.message)
      ToastAndroid.show(_.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message, ToastAndroid.LONG);
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
          Quên mật khẩu
        </Text>

        <View className='w-full justify-center'>
          {!verifyPhoneNumber ? (
            <FormField 
              title="Số điện thoại"
              value={formPhoneNumber.phoneNumber}
              handleChangeText={(e) => setFormPhoneNumber({ ...formPhoneNumber, phoneNumber: e})}
              otherStyles='mt-7'
              keyboardType='number-pad'
            />
          ) : (
            <Text className='font-pmedium text-base text-white mt-5'>
              Số điện thoại: 0{formPhoneNumber.phoneNumber}
            </Text>
          )}
        </View>
        
        {verifyPhoneNumber && (
          <>
            <Text className='font-pmedium text-sm text-gray-100 mt-5'>
              Mã xác thực gửi về số điện thoại của bạn
            </Text>
            
            <View 
              className='flex-row justify-between mt-10 space-x-4 w-full items-center'
            >
              <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code1: e })}/>
              <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code2: e })}/>
              <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code3: e })}/>
              <EnterNumber placeholder="-" handleChangeText={(e) => setForm({ ...form, code4: e })}/>
            </View>
          </>
        )}
        
        
        <CustomButton 
          title={isSubmitting ? <ActivityIndicator color={'#CDCDE0'} size={32} /> : 'Tiếp tục'}
          handlePress={verifyPhoneNumber ? submitVerificationCode : submitVerificationPhone}
          containerStyles='mt-16'
          isLoading={isSubmitting}
        />
        
        {verifyPhoneNumber && (
          <View className='flex-row justify-center mt-4'>
            <Text className='font-pmedium text-sm text-gray-100 mt-2'>
              {timeLeft !== null ? 'Gửi lại sau: ' : 'Chưa nhận được tin nhắn? '}{' '}
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
        )}
      </View>
      <ResetPasswordModal 
        visible={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        payload={{ phoneNumber: formPhoneNumber.phoneNumber, code: form.code1 + form.code2 + form.code3 + form.code4 }}
        // onSelect={submit}
      />
    </SafeAreaView>
  )
}

export default ForgotPassword