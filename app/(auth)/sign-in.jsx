import { ScrollView, View, Text, Image } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import Toast from 'react-native-toast-message'

const SignIn = () => {
  const { login } = useGlobalContext();
  
  const [form, setForm] = useState({
    phoneCode: '84',
    phoneNumber: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    if(!form.phoneNumber || !form.password) {
      Toast.show({
        type: 'error',
        text1: 'Hãy điền đầy đủ thông tin',
      });
      return
    }
    setIsSubmitting(true)
    
    try {
      await login(form.phoneNumber, form.password)
    } catch (error) {
      console.log('login-error', error)
      Toast.show({
        type: 'error',
        text1: error.message || 'Đăng nhập thất bại. Vui lòng thử lại sau',
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
            className='text-2xl text-white text-semi  bold mt-10 font-psemibold'
          >
            Đăng nhập Kleenix
          </Text>
          
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
          
          <View className='justify-end pt-5 flex-row gap-2'>
            <Link href="/forgot-password" className='text-sm font-psemibold text-secondary'>Quên mật khẩu</Link>
          </View>
          
          <CustomButton 
            title='Đăng nhập'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text
              className='text-lg text-gray-100 font-pregular'
            >
              Bạn chưa có tài khoản?
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Đăng ký</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn