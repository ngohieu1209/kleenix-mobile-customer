import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalLine from './HorizontalLine'
import { fDateTime } from '../utils/format-time'
import { fCurrency } from '../utils/format-currency';
import { fAddress } from '../utils/format-address';
import { addMinutes } from 'date-fns';
import { REACT_APP_BASE_ICON_URL } from '@env';
import { useGlobalContext } from '../context/GlobalProvider';

const PromotionModal = ({ visible, onClose, onSelect, promotion }) => {
  const { id, name, discount, startTime, endTime, amount, description, image, point } = promotion;
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useGlobalContext();
  
  const imageURL = `${REACT_APP_BASE_ICON_URL}/${image}`
  
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
                {name}
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className='w-4 h-4' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          <Image
            source={{ uri: imageURL }}
            className='w-full h-72 rounded-[35px]'
            resizeMode='cover'
          />
          <Text className='text-white text-xl mt-4 font-psemibold'>{name}</Text>
          <Text className='text-gray-200 text-sm mt-2 font-pregular'>{description}</Text>
          <HorizontalLine />
          <Text className='text-secondary text-lg font-psemibold'>Giảm giá: {fCurrency(Number(discount))}</Text>
          <Text className='text-white text-base mt-2 font-semibold'>Điểm đổi: {point}</Text>
          <Text className='text-white text-base mt-2 font-semibold'>Số lượng: {amount}</Text>
          <Text className='text-red-400 text-sm mt-4 font-psemibold'>{fDateTime(startTime)} - {fDateTime(endTime)}</Text>
          <HorizontalLine />
          <Text className='text-white text-lg font-psemibold'>Điều kiện sử dụng</Text>
          <Text className='text-gray-200 text-sm mt-2 font-pregular'>• Ưu đãi chỉ áp dụng 1 lần</Text>
          <Text className='text-gray-200 text-sm mt-2 font-pregular'>• Áp dụng cho thanh toán tất cả các dịch vụ</Text>
          <Text className='text-gray-200 text-sm mt-2 font-pregular'>• Không sử dụng đồng thời với các ưu đãi khác</Text>
        </ScrollView>
        <TouchableOpacity
          onPress={onSelect}
          activeOpacity={0.7}
          className={`mx-3 rounded-xl min-h-[62px] justify-center items-center mt-4 mb-4 ${user && Number(user.kPoints) < Number(point) ? 'bg-gray-200 opacity-50' : 'bg-secondary'}`}
          disabled={user && Number(user.kPoints) < Number(point)}
        >
          <Text className={`text-primary font-psemibold text-lg mx-4`}>
            Đổi thưởng
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default PromotionModal;
