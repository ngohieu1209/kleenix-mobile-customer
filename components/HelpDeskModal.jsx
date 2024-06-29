import {View, Text, Modal, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import * as Linking from 'expo-linking';
import React from 'react';
import icons from '../constants/icons';

const HelpDeskModal = ({ visible, onClose }) => {
  
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
          <Text className='text-base text-gray-100 font-pmedium mt-8 mb-2'>
            Để được hỗ trợ, vui lòng liên hệ qua:
          </Text>
          <TouchableOpacity 
            className='flex-row items-center space-x-4'
            activeOpacity={0.7}
            onPress={() => Linking.openURL('tel:0974324709')}
          >
            <Image source={icons.telephoneCall} className='w-4 h-4' />
            <Text className='text-base text-gray-100 font-pmedium'>
              0974324709
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className='flex-row items-center space-x-4'
            activeOpacity={0.7}
            onPress={() => Linking.openURL('mailto:support@kleenix.vn')}
          >
            <Image source={icons.email} className='w-4 h-4' />
            <Text className='text-base text-gray-100 font-pmedium'>
              support@kleenix.vn
            </Text>
          </TouchableOpacity>
          <Text className='text-base text-gray-100 font-pmedium mt-8 mb-2'>
            Văn phòng Kleenix:
          </Text>
          <TouchableOpacity 
            className='flex-row items-center space-x-4 mr-6'
            activeOpacity={0.7}
          >
            <Image source={icons.homeAddress} className='w-4 h-4' />
            <Text className='text-base text-gray-100 font-pmedium'>
              LK928, Khu đô thị Văn Phú, Hà Đông, Hà Nội
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HelpDeskModal;
