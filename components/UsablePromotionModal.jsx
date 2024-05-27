import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalLine from './HorizontalLine'
import { fDateTime } from '../utils/format-time'
import { fCurrency } from '../utils/format-currency';
import { fAddress } from '../utils/format-address';
import { addMinutes } from 'date-fns';

const UsablePromotionModal = ({ visible, onClose, onSelect, promotions }) => {
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
                Ưu đãi của bạn
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className='w-4 h-4' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          {promotions.map((item) => {
            const { id, name, discount, startTime, endTime } = item.promotion;
            return (
              <View
                key={id}
              >
                <TouchableOpacity
                  className='mb-6 p-4 bg-black-100 rounded-2xl'
                  activeOpacity={0.7}
                  onPress={() => onSelect(item.promotion)}
                  >
                  <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center space-x-2'>
                      {/* <Image 
                        source={{ uri: iconURL }}
                        className='w-6 h-6'
                        resizeMode='cover'
                      /> */}
                      <Text className='text-base text-white font-psemibold'>{name}</Text>
                    </View>
                  </View>
                  <View className='space-y-2 mt-2'>
                    <Text className='text-sm text-yellow-300 font-psemibold'>Giảm giá: {fCurrency(Number(discount))}</Text>
                    <Text className='text-red-400 text-sm font-pregular '>{fDateTime(startTime)} - {fDateTime(endTime)}</Text>
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

export default UsablePromotionModal;
