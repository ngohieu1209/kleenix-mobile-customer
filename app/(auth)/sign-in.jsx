import { ScrollView, View, Text, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { authApi } from '../../services/api'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [form, setForm] = useState({
    phoneCode: '84',
    phoneNumber: '956895689',
    password: '123456'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    if(!form.phoneNumber || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)
    
    try {
      const data = await authApi.login(form)
      setUser(data.result.user);
      setIsLoggedIn(true)
      
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
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
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType='number-pad'
          />
          
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles='mt-7'
          />
          
          <CustomButton 
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text
              className='text-lg text-gray-100 font-pregular'
            >
              Don't have account?
            </Text>
            <Link href="/verification" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn