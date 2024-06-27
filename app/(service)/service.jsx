import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXPO_PUBLIC_BASE_ICON_URL } from '@env';

import { useLocalSearchParams, router } from 'expo-router';
import _ from 'lodash';
import { setHours, setMinutes, setSeconds, isAfter, addHours, format } from 'date-fns';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import BackButtonHeader from '../../components/BackButtonHeader';
import FieldDateTimePicker from '../../components/FieldDateTimePicker';
import OrderModal from '../../components/OrderModal';

import useFetchData from '../../services/useFetchData';
import {
  serviceApi,
  extraServiceApi,
  addressApi,
  bookingApi,
  promotionApi,
} from '../../services/api';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { fCurrency } from '../../utils/format-currency';
import { fMinutesToHours } from '../../utils/format-time';
import LoadingScreen from '../../components/LoadingScreen';
import UsablePromotionModal from '../../components/UsablePromotionModal';
import PaymentStatusModal from '../../components/PaymentStatusModal';
import Toast from 'react-native-toast-message';
import { fAddress } from '../../utils/format-address';
import RNPickerSelect from 'react-native-picker-select';

const Service = () => {
  const iconBaseURL = `${EXPO_PUBLIC_BASE_ICON_URL}`;
  const { user, authenticated } = useGlobalContext();
  const { id: serviceId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { data: service, isLoading: loadingService } = useFetchData(
    authenticated ? serviceApi.getListPackage(serviceId) : null
  );
  const { data: extraServices, isLoading: loadingExtraService } = useFetchData(
    authenticated ? extraServiceApi.getListExtraService() : null
  );
  const { data: listAddress, isLoading: loadingAddress } = useFetchData(
    authenticated ? addressApi.getListAddress() : null
  );
  const { data: listUsablePromotion, isLoading: loadingPromotion } =
    useFetchData(authenticated ? promotionApi.getListUsable() : null);
  const { name, packages } = service;
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [form, setForm] = useState({
    listPackage: [],
    extraServiceIds: [],
    duration: 0,
    note: null,
    totalPrice: 0,
    dateTime: null,
    date: null,
    time: null,
    paymentStatus: null,
    promotionId: null,
  });
  const [isVisibleModalOrder, setIsVisibleModalOrder] = useState(false);
  const [isVisibleModalPromotion, setIsVisibleModalPromotion] = useState(false);
  const [isVisibleModalPaymentStatus, setIsVisibleModalPaymentStatus] =
    useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const hours = [...Array(15).keys()].map(hour => {
    // Cộng thêm 7 vì bạn muốn bắt đầu từ 7:00
    const adjustedHour = hour + 7;
    // Định dạng giờ từ 0-23 thành AM/PM
    const label = adjustedHour < 12 ? `${adjustedHour}:00 AM` : `${adjustedHour === 12 ? adjustedHour : adjustedHour - 12}:00 PM`;
    return { label, value: adjustedHour };
  });

  const handleSelectPackage = (packageService) => {
    let newDuration = form.duration;
    let newTotalPrice = form.totalPrice;

    if (selectedPackage) {
      newDuration -= Number(selectedPackage.duration);
      newTotalPrice -= Number(selectedPackage.price);
    }

    newDuration += Number(packageService.duration);
    newTotalPrice += Number(packageService.price);

    setSelectedPackage(packageService);
    setForm({
      ...form,
      listPackage: [
        {
          packageId: packageService.id,
          quantity: 1,
        },
      ],
      duration: newDuration,
      totalPrice: newTotalPrice,
    });
  };

  const handleSelectExtraService = (extraService) => {
    let newExtraServiceIds = [...form.extraServiceIds];
    let newDuration = form.duration;
    let newTotalPrice = form.totalPrice;

    if (newExtraServiceIds.includes(extraService.id)) {
      newExtraServiceIds = newExtraServiceIds.filter(
        (item) => item !== extraService.id
      );
      newDuration -= Number(extraService.duration);
      newTotalPrice -= Number(extraService.price);
    } else {
      newExtraServiceIds.push(extraService.id);
      newDuration += Number(extraService.duration);
      newTotalPrice += Number(extraService.price);
    }
    setForm({
      ...form,
      extraServiceIds: newExtraServiceIds,
      duration: newDuration,
      totalPrice: newTotalPrice,
    });
  };

  const selectedListPackage = () => {
    if (form.listPackage.length > 0) {
      const result = _.map(form.listPackage, (item) => {
        const packageData = _.find(packages, { id: item.packageId });
        return { ...packageData, quantity: item.quantity };
      });
      return result;
    }
    return [];
  };

  const selectedListExtraService = () => {
    if (form.extraServiceIds.length > 0) {
      const result = _.map(form.extraServiceIds, (item) => {
        return _.find(extraServices, { id: item });
      });
      return result;
    }
    return [];
  };

  const isValidateTime = (selectedDate, selectedTime) => {
    const now = new Date();
    const minimumDateTime = addHours(now, 2); // Thời điểm hiện tại cộng thêm 2 giờ
    const dateTime = setSeconds(
      setMinutes(
        setHours(selectedDate, selectedTime.getHours()),
        selectedTime.getMinutes()
      ),
      selectedTime.getSeconds()
    );

    const startOfWorkDay = setHours(
      setMinutes(setSeconds(selectedDate, 0, 0), 0),
      7
    ); // 7:00 sáng
    const endOfWorkDay = setHours(
      setMinutes(setSeconds(selectedDate, 59, 59), 59),
      21
    ); // 21:00 tối

    return (
      isAfter(dateTime, minimumDateTime) &&
      dateTime >= startOfWorkDay &&
      dateTime <= endOfWorkDay
    );
  };

  const submitContinue = () => {
    const date = new Date(form.date);
    const time = new Date(form.time);
    const dateTime = setSeconds(
      setMinutes(setHours(date, time.getHours()), time.getMinutes()),
      time.getSeconds()
    );
    if (!isValidateTime(date, time)) {
      Toast.show({
        type: 'error',
        text1: 'Thời gian không hợp lệ',
        text2:
          'Vui lòng chọn thời gian sau 2 tiếng từ hiện tại và trong khoảng từ 7h đến 21h.',
      });
    } else {
      setForm({ ...form, dateTime });
      setIsVisibleModalOrder(!isVisibleModalOrder);
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      await bookingApi.newBooking(form);
      router.replace('/activities');
    } catch (error) {
      console.log('booking-error', error);
      Toast.show({
        type: 'error',
        text1: error.message || 'Đặt lịch thất bại. Vui lòng thử lại sau',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPromotion = (promotion) => {
    setSelectedPromotion(promotion);
    setForm({
      ...form,
      promotionId: promotion.id,
      totalPrice: Number(form.totalPrice) - Number(promotion.discount),
    });
    setIsVisibleModalPromotion(false);
  };

  const handleCancelPromotion = () => {
    setForm({
      ...form,
      promotionId: null,
      totalPrice: Number(form.totalPrice) + Number(selectedPromotion.discount),
    });
    setSelectedPromotion(null);
  };

  const handleSelectPaymentStatus = (paymentStatus) => {
    setForm({
      ...form,
      paymentStatus,
    });
    setIsVisibleModalPaymentStatus(false);
  };

  if (
    loadingService ||
    loadingExtraService ||
    loadingAddress ||
    loadingPromotion
  ) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <BackButtonHeader title={name} />
      <ScrollView className='px-4 my-4'>
        <View className='space-y-2'>
          <View className='flex-row space-x-2'>
            <Image
              source={icons.location}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Địa chỉ
            </Text>
          </View>
          <TouchableOpacity
            className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'
            activeOpacity={0.7}
            onPress={() => router.push('address')}
          >
            <Text className='text-base text-white font-pmedium'>
              {listAddress.length > 0
                ? fAddress(listAddress.find((item) => item.isDefault))
                : '-- Thêm địa chỉ mặc định --'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className='space-y-2 mt-8'>
          <View className='flex-row space-x-2'>
            <Image
              source={icons.house}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Dịch vụ
            </Text>
          </View>
          {packages && packages.length > 0 ? (
            <View>
              {packages.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className='mt-2'
                  activeOpacity={0.7}
                  onPress={() => handleSelectPackage(item)}
                >
                  <View
                    className={`${
                      item.id === selectedPackage?.id
                        ? 'border border-secondary'
                        : ''
                    } w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start`}
                  >
                    <Text className='text-base text-white font-pmedium'>
                      {item.name}
                    </Text>
                    <Text className='text-sm text-gray-400 font-pregular mt-1'>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              <Text className='text-base text-gray-100 font-pmedium'>
                Không có dữ liệu
              </Text>
            </View>
          )}
        </View>

        <View className='space-y-2 mt-8'>
          <View className='flex-row space-x-2'>
            <Image
              source={icons.boxPlus}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Dịch vụ thêm
            </Text>
          </View>
          {extraServices && extraServices.length > 0 ? (
            <View>
              {extraServices.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className='mt-2'
                  activeOpacity={0.7}
                  onPress={() => handleSelectExtraService(item)}
                >
                  <View
                    className={`${
                      form.extraServiceIds.includes(item.id)
                        ? 'border border-secondary'
                        : ''
                    } w-full py-4 px-4 bg-black-100 rounded-2xl flex-row justify-start items-start space-x-4`}
                  >
                    <Image
                      source={{ uri: `${iconBaseURL}/${item.icon}` }}
                      className='w-5 h-5'
                      resizeMode='contain'
                    />
                    <Text className='text-base text-white font-pmedium'>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              <Text className='text-base text-gray-100 font-pmedium'>
                Không có dữ liệu
              </Text>
            </View>
          )}
        </View>

        <FieldDateTimePicker
          title='Ngày làm việc'
          icon={icons.schedule}
          value={form.date}
          mode='date'
          handleChangeDateTime={(selectedDate) =>
            setForm({ ...form, date: selectedDate })
          }
          otherStyles='mt-8'
        />
        
        <View className='space-y-2 mt-8'>
          <View className='flex-row space-x-2'>
            <Image
              source={icons.clockColor}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Thời gian làm việc
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className='mt-2'
              activeOpacity={0.7}
            >
              <View
                className={`w-full py-2 px-4 bg-black-100 rounded-2xl flex-row justify-between items-center space-x-4`}
              >
                <RNPickerSelect
                  onValueChange={(value) => setForm({ ...form, time: setHours(setMinutes(setSeconds(new Date, 0, 0), 0), value) })}
                  items={hours}
                  placeholder={{ label: '-- chọn thời gian --', value: null }}
                  style={{
                    inputAndroid: {
                      width: '100vh',
                      fontSize: 16,
                      fontFamily: 'Poppins-SemiBold',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      color: 'white',
                      paddingRight: 30,
                      minWidth: '90%', 
                    },
                  }}
                  useNativeAndroidPickerStyle={false} // Đây là dòng quan trọng để disable style mặc định của Android và sử dụng style custom
                />
                  <Image
                    source={icons.clock}
                    className='w-6 h-6'
                    resizeMode='contain'
                  />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <FormField
          title='Ghi chú'
          icon={icons.note}
          value={form.note}
          placeholder='Thêm ghi chú hoặc mô tả của bạn ...'
          handleChangeText={(e) => setForm({ ...form, note: e })}
          otherStyles='mt-8'
        />

        <View className='space-y-2 mt-8'>
          <View className='flex-row space-x-2'>
            <Image
              source={icons.giftBox}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Áp dụng khuyến mãi
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className='mt-2'
              activeOpacity={0.7}
              onPress={() => setIsVisibleModalPromotion(true)}
            >
              <View
                className={`w-full py-4 px-4 bg-black-100 rounded-2xl flex-row justify-between items-center space-x-4`}
              >
                <View>
                  <Text className='text-base text-white font-pmedium'>
                    {selectedPromotion
                      ? selectedPromotion.name
                      : 'Chọn khuyến mãi'}
                  </Text>
                </View>
                {selectedPromotion ? (
                  <TouchableOpacity
                    onPress={handleCancelPromotion}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={icons.close}
                      className='w-4 h-4 mr-2'
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={icons.rightContinue}
                    className='w-4 h-4 mr-2'
                    resizeMode='contain'
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className='space-y-2 mt-8'>
          <View className='flex-row space-x-2'>
            <Image
              source={icons.wallet}
              className='w-5 h-5'
              resizeMode='contain'
            />
            <Text className='text-base text-gray-100 font-pmedium'>
              Hình thức thanh toán
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className='mt-2'
              activeOpacity={0.7}
              onPress={() => setIsVisibleModalPaymentStatus(true)}
            >
              <View
                className={`w-full py-4 px-4 bg-black-100 rounded-2xl flex-row justify-between items-center space-x-4`}
              >
                <View>
                  {/* <Image 
                    source={{ uri: `${iconBaseURL}/${item.icon}` }}
                    className='w-5 h-5'
                    resizeMode='contain'
                  /> */}
                  <Text className='text-base text-white font-pmedium'>
                    {form.paymentStatus
                      ? form.paymentStatus === 'KPAY'
                        ? 'KPAY'
                        : 'Tiền mặt'
                      : 'Chọn hình thức thanh toán'}
                  </Text>
                </View>
                {!form.paymentStatus && (
                  <Image
                    source={icons.rightContinue}
                    className='w-4 h-4 mr-2'
                    resizeMode='contain'
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={submitContinue}
        activeOpacity={0.7}
        className={`flex-row mx-3 rounded-xl min-h-[62px] justify-between items-center mt-4 mb-4 ${
          form.duration === 0 ||
          form.date === null ||
          form.time === null ||
          form.totalPrice === 0 ||
          form.paymentStatus === null ||
          listAddress.length === 0
            ? 'bg-gray-200 opacity-50'
            : 'bg-secondary'
        }`}
        disabled={
          form.duration === 0 ||
          form.date === null ||
          form.time === null ||
          form.totalPrice === 0 ||
          form.paymentStatus === null ||
          listAddress.length === 0
        }
      >
        <Text className={`text-primary font-psemibold text-lg mx-4`}>
          {fCurrency(form.totalPrice)}/{fMinutesToHours(form.duration)}
        </Text>

        <Text className={`text-primary font-psemibold text-lg mx-4`}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
      <OrderModal
        order={form}
        address={listAddress.find((item) => item.isDefault)}
        user={user}
        service={service}
        selectedListPackage={selectedListPackage()}
        selectedListExtraService={selectedListExtraService()}
        selectedPromotion={selectedPromotion}
        visible={isVisibleModalOrder}
        onClose={() => setIsVisibleModalOrder(false)}
        onSelect={submit}
      />
      <UsablePromotionModal
        promotions={listUsablePromotion}
        visible={isVisibleModalPromotion}
        onClose={() => setIsVisibleModalPromotion(false)}
        onSelect={handleSelectPromotion}
      />
      <PaymentStatusModal
        visible={isVisibleModalPaymentStatus}
        onClose={() => setIsVisibleModalPaymentStatus(false)}
        onSelect={handleSelectPaymentStatus}
      />
    </SafeAreaView>
  );
};

export default Service;
