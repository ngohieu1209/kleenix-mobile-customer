import { View, Text, ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import _, { set } from 'lodash';
import { userApi } from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import BackButtonHeader from '../../components/BackButtonHeader';
import { images, icons } from '../../constants';
import { fCurrency } from '../../utils/format-currency';

const Payment = () => {
  const { user, setUser } = useGlobalContext();
  const [amount, setAmount] = useState('');
  const [isPay, setIsPay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  
  const subscribe = async() => {
    setIsSubmitting(true);
    try {
      const data = await userApi.requestPayment(Number(amount));
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Kleenix',
        allowsDelayedPaymentMethods: true,
        style: 'alwaysDark',
        defaultBillingDetails: {
          address: {
            country: 'VN'
          },
        },
      });
      if(initSheet.error) return Alert.alert(initSheet.error.message)
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if(presentSheet.error && presentSheet.error.code !== "Canceled") return Alert.alert(presentSheet.error.message)
      const payment = await userApi.paymentSuccess(Number(amount));
      setUser({...user, kPay: Number(payment)});
      setAmount('');
      setIsPay(false);
    } catch (error) {
      console.log(error.message);
      Alert.alert('Lỗi', _.isArray(error.message) ? error.message[0] : error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <StripeProvider
        publishableKey='pk_test_51PJWJgBYVejbDjOqQKXyakM0uguPSdZMhg49IVvHsklHeboknbDYLhBDokGFlCV15eRd7NRx872CC8XZ3jkbqMp800pANt291e'
      >
        <BackButtonHeader title='Tài khoản' />
        <ScrollView>
          <View className='w-full justify-center min-h-[60vh] px-4 my-6'>
            <Image 
              source={images.logo}
              resizeMode='contain'
              className='w-[115px] h-[115px]'
            />
            
            <Text
              className='text-2xl text-white text-semi  bold mt-10 font-psemibold'
            >
              Kleenix-Pay
            </Text>
            
            <View>
              <Text
                className='text-lg text-gray-100 font-pregular mt-7'
              >
                Số tiền trong tài khoản
              </Text>
              <Text
                className='text-2xl text-secondary-100 font-psemibold mt-2'
              >
                {fCurrency(Number(user.kPay))}
              </Text>
            </View>
            {isPay ? (
              <View className='border-4 px-4 py-8 border-dashed border-gray-500 mt-6'>
                <TouchableOpacity
                  className='absolute top-2 right-2'
                  activeOpacity={0.7}
                  onPress={() => setIsPay(false)}
                >
                  <Image 
                    source={icons.closeRound}
                    tintColor='#FF5580'
                    resizeMode='contain'
                    className='w-8 h-8'
                  />
                </TouchableOpacity>
                <FormField 
                  title="Số tiền cần nạp"
                  value={amount}
                  handleChangeText={(e) => setAmount(e)}
                  keyboardType='number-pad'
                />
                <CustomButton 
                  title={isSubmitting ? <ActivityIndicator color={'#CDCDE0'} size={32} /> : 'Nạp tiền'}
                  handlePress={subscribe}
                  containerStyles='mt-7'
                  isLoading={isSubmitting}
                />
              </View>
            ) : (
              <CustomButton 
                title='Nạp thêm'
                handlePress={() => setIsPay(true)}
                containerStyles='mt-7'
              />
            )}
          </View>
        </ScrollView>
      </StripeProvider>
    </SafeAreaView>
  );
};

export default Payment;
