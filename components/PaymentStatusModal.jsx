import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalLine from './HorizontalLine'
import { fDateTime } from '../utils/format-time'
import { fCurrency } from '../utils/format-currency';
import { fAddress } from '../utils/format-address';
import { addMinutes } from 'date-fns';

const paymentStatus = [
  {
    status: 'KPAY',
    name: 'Thanh toán qua KPAY',
  },
  {
    status: 'CASH',
    name: 'Thanh toán bằng tiền mặt',
  },
]

const PaymentStatusModal = ({ visible, onClose, onSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <View className='flex my-6 px-4 space-y-6'>
          <View className='flex-row'>
            <View className='flex-1'>
              <Text className='text-white font-pmedium text-base'>
                Hình thức thanh toán
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className='w-4 h-4' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          {paymentStatus.map((item, index) => {
            return (
              <View
                key={index}
              >
                <TouchableOpacity
                  className='mb-6 p-4 bg-black-100 rounded-2xl'
                  activeOpacity={0.7}
                  onPress={() => onSelect(item.status)}
                  >
                  <View className='flex-row justify-between items-center'>
                      {/* <Image 
                        source={{ uri: iconURL }}
                        className='w-6 h-6'
                        resizeMode='cover'
                      /> */}
                      <Text className='text-base text-white font-psemibold'>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default PaymentStatusModal;
