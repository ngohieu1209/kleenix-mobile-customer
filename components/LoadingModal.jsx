import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingModal = ({ isVisible, body}) => {

  return (
    <Modal
      visible={isVisible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        className='flex-1 bg-gray-500/80 justify-center items-center'
      >
        <ActivityIndicator color={'#ffffff'} size={32} />
        <Text className='text-white text-lg font-psemibold'>
          {body ? body : 'Đang tải dữ liệu'}
        </Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;
