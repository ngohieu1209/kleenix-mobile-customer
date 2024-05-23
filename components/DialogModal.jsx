import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const DialogModal = ({ isVisible, title, message, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View
        className='flex-1 justify-center items-center bg-black-200/60'
      >
        <View
          className='w-10/12 rounded-2xl p-6 items-center bg-[#2D2D2D]'
        >
          <Text className='text-white mb-2 font-psemibold text-lg'>{title}</Text>
          <Text className='text-white mb-6 text-center text-base font-pregular'>{message}</Text>
          <View
            className='flex-row justify-between w-full'
          >
            <TouchableOpacity
              className='bg-[#FF3B30] p-3 rounded-md items-center flex-1 mr-5'
              onPress={onConfirm}
            >
              <Text className='text-white font-psemibold'>Xoá</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className='bg-[#4A4A4A] p-3 rounded-md items-center flex-1'
              onPress={onCancel}
            >
              <Text className='text-white font-psemibold'>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogModal;