import { ScrollView, View, Text, Image } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { authApi } from '../../services/api'

import Toast from 'react-native-toast-message'

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    phoneCode: '84',
    phoneNumber: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    if(!form.name || !form.phoneNumber || !form.password) {
      Toast.show({
        type: 'error',
        text1: 'Hãy điền đầy đủ thông tin',
      });
      return
    }
    setIsSubmitting(true)
    
    try {
      await authApi.register(form)
      Toast.show({
        type: 'success',
        text1: 'Đăng ký thành công',
      });
      router.replace('sign-in')
    } catch (error) {
      console.log('register-error', error)
      Toast.show({
        type: 'error',
        text1: error.message || 'Đăng ký thất bại. Vui lòng thử lại sau',
      });
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[115px]'
          />
          
          <Text
            className='text-2xl text-white text-semibold mt-10 font-psemibold'
          >
            Đăng ký Kleenix
          </Text>
          
          <FormField 
            title="Họ và tên"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles='mt-7'
          />
          
          <FormField 
            title="Số điện thoại"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e})}
            otherStyles='mt-7'
            keyboardType='number-pad'
          />
          
          <FormField 
            title="Mật khẩu"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles='mt-7'
          />
          
          <CustomButton 
            title='Đăng ký'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text
              className='text-lg text-gray-100 font-pregular'
            >
              Đã có tài khoản?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Đăng nhập</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp