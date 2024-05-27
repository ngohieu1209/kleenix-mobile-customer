import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, icon, value, placeholder, handleChangeText, otherStyles, onSubmit, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const handleClearText = () => {
    handleChangeText('')
  }
  
  const containsPassword = (str) => {
    return str.toLowerCase().includes("mật khẩu");
  }
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className='flex-row space-x-2'>
        {icon && (
          <Image 
            source={icon}
            className='w-5 h-5'
            resizeMode='contain'
          />
        )}
        <Text className='text-base text-gray-100 font-pmedium'>
          {title}
        </Text>
      </View>
      <View 
        className={`${(title === 'Ghi chú') ? 'h-32 items-start' : 'h-16 items-center'} border-2 border-black-200 w-full px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row`}
      >
        <TextInput 
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={ containsPassword(title) && !showPassword}
          onSubmitEditing={ title === 'Tìm kiếm địa điểm' ? onSubmit : null}
          returnKeyType={ title === 'Tìm kiếm địa điểm' ? 'search' : 'done'}
          multiline={title === 'Ghi chú'}
          numberOfLines={title === 'Ghi chú' ? 4 : 1}
          {...props}
        />
        
        {containsPassword(title) && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
        
        {title === 'Tìm kiếm địa điểm' && value && (
          <TouchableOpacity
            onPress={() => handleClearText()}
          >
            <Image
              source={icons.close}
              className='w-3 h-3'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField