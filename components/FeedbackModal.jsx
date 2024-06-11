import {View, Text, Modal, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import CustomButton from './CustomButton';
import icons from '../constants/icons';
import { AirbnbRating } from 'react-native-ratings';
import feedbackApi from '../services/api/feedback';
import { router } from 'expo-router';

const FeedbackModal = ({ visible, onClose, bookingId, feedback }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    rating: 5,
    feedback: '',
  });
  
  useEffect(() => {
    if(feedback) {
      setForm({ rating: feedback.rating, feedback: feedback.feedback });
    }
  }, [feedback]);
  
  const handleClose = () => {
    setForm({ rating: 5, feedback: '' });
    onClose();
  }
  
  const submit = async () => {
    setIsSubmitting(true);
    try {
      await feedbackApi.createFeedback({ bookingId, ...form })
      setForm({ rating: 5, feedback: '' });
      onClose();
      ToastAndroid.show('Gửi phản hồi thành công', ToastAndroid.SHORT);
    } catch (error) {
      console.log('feedback error', error);
      ToastAndroid.show('Gửi phản hồi thất bại', ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false);
    }
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
            Chất lượng dịch vụ
          </Text>
          <AirbnbRating
            count={5}
            reviews={["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"]}
            defaultRating={form.rating}
            size={20}
            reviewSize={18}
            onFinishRating={(rating) => setForm({ ...form, rating })}
          />
          <FormField 
            title='Nhận xét'
            value={form.feedback}
            placeholder='Hãy chia sẻ nhận xét cho dịch vụ này bạn nhé!'
            handleChangeText={(e) => setForm({ ...form, feedback: e })}
            otherStyles='mb-2'
          />
          { !feedback && (
            <CustomButton 
              title='Gửi'
              handlePress={submit}
              containerStyles='mt-5'
              isLoading={isSubmitting}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;
