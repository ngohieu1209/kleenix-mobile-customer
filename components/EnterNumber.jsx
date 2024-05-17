import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const EnterNumber = ({ value, placeholder, handleChangeText, otherStyles, ...props }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View 
        className='border-2 border-black-200 w-16 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput
          keyboardType='number-pad'
          maxLength={1}
          className='text-center flex-1 text-white font-psemibold text-lg'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  )
}

export default EnterNumber