import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { addDays } from 'date-fns'

import { fDate, fTime } from '../utils/format-time'

import { icons } from '../constants'

import DateTimePicker from '@react-native-community/datetimepicker'

const FilterDateTimePicker = ({ title, value, mode, handleChangeDateTime, icon, otherStyles, ...props }) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)
  
  const onChange = (event, selectedDate) => {
    setIsShowDatePicker(false)
    handleChangeDateTime(selectedDate)
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
      <TouchableOpacity 
        className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'
        activeOpacity={0.7}
        onPress={() => setIsShowDatePicker(!isShowDatePicker)}
      >
      {mode === 'date' && (
        <>
          <Text
            className={`flex-1 ${value ? 'text-white' : 'text-gray-100'} font-psemibold text-base`}
          >
            {value ? fDate(value) : '-- chọn ngày --'}
          </Text>
          <Image
            source={icons.calendar}
            className='w-6 h-6'
            resizeMode='contain'
          />
        </>
      )}
      {mode === 'time' && (
        <>
          <Text
            className={`flex-1 ${value ? 'text-white' : 'text-gray-100'} font-psemibold text-base`}
          >
            {value ? fTime(value) : '-- chọn thời gian --'}
          </Text>
          <Image
            source={icons.clock}
            className='w-6 h-6'
            resizeMode='contain'
          />
        </>
      )}
      </TouchableOpacity>
      {isShowDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          timeZoneName={'Asia/Ho_Chi_Minh'}
          locale='vi-VN'
        />
      )}
    </View>
  )
}

export default FilterDateTimePicker