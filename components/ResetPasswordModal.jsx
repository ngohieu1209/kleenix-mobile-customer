import { View, Text, Modal, TouchableOpacity, Image, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import { authApi } from '../services/api';

import FormField from './FormField';

const ResetPasswordModal = ({ visible, onClose, payload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  
  const handleClose = () => {
    setForm({
      newPassword: '',
      confirmPassword: ''
    })
    onClose();
  };
  
  const handleSubmit = async () => {
    if(!form.newPassword || !form.confirmPassword) {
      ToastAndroid.show('Hãy điền đầy đủ thông tin', ToastAndroid.SHORT);
      return
    }
    
    if(form.newPassword !== form.confirmPassword) {
      ToastAndroid.show('Xác nhận mật khẩu mới không khớp', ToastAndroid.SHORT);
      return
    }
    
    if(form.newPassword.length < 6) {
      ToastAndroid.show('Mật khẩu phải có ít nhất 6 ký tự', ToastAndroid.SHORT);
      return
    }
    setIsLoading(true)
    try {
      await authApi.resetPassword({ newPassword: form.newPassword, phoneNumber: payload.phoneNumber, code: payload.code })
      handleClose()
      ToastAndroid.show('Đặt mật khẩu thành công', ToastAndroid.SHORT);
      router.replace('sign-in')
    } catch (error) {
      console.log('winter-log: ResetPasswordModal -> error', error)
      ToastAndroid.show('Có lỗi xảy ra khi đặt lại mật khẩu', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <View className='flex my-6 px-4 space-y-6'>
          <View className='flex-row'>
            <View className='flex-1'>
              <Text className='text-white font-pmedium text-base'>
                Đặt lại mật khẩu
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className='w-4 h-4' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          <FormField 
            title="Mật khẩu mới"
            value={form.newPassword}
            handleChangeText={(e) => setForm({ ...form, newPassword: e})}
            otherStyles='mt-7'
          />
          
          <FormField 
            title="Nhập lại mật khẩu"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e})}
            otherStyles='mt-7'
          />
        </ScrollView>
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.7}
          className={`mx-3 rounded-xl min-h-[62px] justify-center items-center mt-4 mb-4 ${!form.newPassword || !form.confirmPassword ? 'bg-gray-200 opacity-50' : 'bg-secondary'}`}
          disabled={!form.newPassword || !form.confirmPassword}
        >
          <Text className={`text-primary font-psemibold text-lg mx-4`}>
            {isLoading ? <ActivityIndicator color={'#CDCDE0'} size={32} /> :  'Đổi mật khẩu' }
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ResetPasswordModal;
