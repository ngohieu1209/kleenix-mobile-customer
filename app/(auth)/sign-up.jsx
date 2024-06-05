import { ScrollView, View, Text, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { authApi } from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [form, setForm] = useState({
    name: '',
    phoneCode: '84',
    phoneNumber: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    if(!form.name || !form.phoneNumber || !form.password) {
      Alert.alert('Lỗi', 'Hãy điền đầy đủ thông tin')
    }
    setIsSubmitting(true)
    
    try {
      await authApi.register(form)
      Alert.alert('Thành công', 'Đăng ký thành công')
    } catch (error) {
      Alert.alert('Lỗi', error.message)
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