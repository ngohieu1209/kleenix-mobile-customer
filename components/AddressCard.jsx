import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

const AddressCard = ({ address: { id, province, district, ward, street, isDefault, long, lat }, onToggleOptions, showOptions }) => {
  
  const handleSetDefault = async (id) => {
    
  }
  
  const handleDelete = async (id) => {
    
  }
  
  return (
    <TouchableOpacity 
      className='mb-6 mx-4 p-4 bg-black-100 rounded-2xl justify-start items-start'
      activeOpacity={0.7}
      onPress={onToggleOptions}
    >
      <Text className='text-base text-white font-pmedium'>{`${street}, ${ward}, ${district}, ${province}`}</Text>
      {isDefault && (
        <View className='border-solid border-2 border-secondary-200 mt-4 rounded-xl'>
          <Text className='text-sm text-secondary-100 font-psemibold p-1'>Mặc định</Text>
        </View>
      )}
      {showOptions && (
        <View className='flex-row justify-between space-x-4 mt-4'>
          <TouchableOpacity className='bg-blue-500 p-2 rounded-xl'>
            <Text className='text-white font-pmedium'>Đặt mặc định</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-red-500 p-2 rounded-xl'>
            <Text className='text-white font-pmedium'>Xoá</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default AddressCard