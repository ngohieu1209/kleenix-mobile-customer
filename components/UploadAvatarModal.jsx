import {View, Text, Modal, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import icons from '../constants/icons';

const UploadAvatarModal = ({ visible, onClose, onCameraPress, onGalleryPress }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleClose = () => {
    onClose();
  }
  
  return (
    <Modal
      visible={visible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent
    >
      <View
        className='flex-1 bg-gray-500/80 justify-center items-center'
      >
        <View className='w-[95%] bg-primary p-4 rounded-xl'>
          <TouchableOpacity
            className='absolute top-4 right-4 z-10'
            activeOpacity={0.7}
            onPress={handleClose}
          >
            <Image source={icons.close} className='w-4 h-4' />
          </TouchableOpacity>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thay đổi ảnh đại diện
          </Text>
          <View className='flex flex-row justify-center items-center mt-8 space-x-14'>
            <View className='flex justify-center items-center'>
              <TouchableOpacity
                className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'
                activeOpacity={0.7}
                onPress={onCameraPress}
              >
                <Image 
                  source={icons.camera}
                  className='w-12 h-12'
                />
              </TouchableOpacity>
              <Text className='text-gray-100 font-pmedium mt-2'>Chụp ảnh</Text>
            </View>
            <View className='flex justify-center items-center'>
              <TouchableOpacity
                className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'
                activeOpacity={0.7}
                onPress={onGalleryPress}
              >
                <Image 
                  source={icons.gallery}
                  className='w-12 h-12'
                />
              </TouchableOpacity>
              <Text className='text-gray-100 font-pmedium mt-2'>Thư mục</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UploadAvatarModal;
