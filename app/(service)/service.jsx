import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { REACT_APP_BASE_ICON_URL } from '@env'

import { useLocalSearchParams, router } from 'expo-router'
import _ from 'lodash'
import { setHours, setMinutes, setSeconds } from 'date-fns';
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import BackButtonHeader from '../../components/BackButtonHeader'
import FieldDateTimePicker from '../../components/FieldDateTimePicker'
import OrderModal from '../../components/OrderModal'

import useFetchData from '../../services/useFetchData'
import { serviceApi, extraServiceApi, addressApi, bookingApi } from '../../services/api'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { fCurrency } from '../../utils/format-currency'
import { fMinutesToHours } from '../../utils/format-time'
import LoadingScreen from '../../components/LoadingScreen'


const Service = () => {
  const iconBaseURL = `${REACT_APP_BASE_ICON_URL}`
  const { id: serviceId } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { data: service, isLoading: loadingService } = useFetchData(serviceApi.getListPackage(serviceId));
  const { data: extraServices, isLoading: loadingExtraService } = useFetchData(extraServiceApi.getListExtraService());
  const { data: listAddress, isLoading: loadingAddress } = useFetchData(addressApi.getListAddress());
  const { name, packages } = service;
  const { user } = useGlobalContext()
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [form, setForm] = useState({
    listPackage: [],
    extraServiceIds: [],
    duration: 0,
    note: null,
    totalPrice: 0,
    dateTime: null,
    date: null,
    time: null,
  })
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)

  const handleSelectPackage = (packageService) => {
    let newDuration = form.duration;
    let newTotalPrice = form.totalPrice;

    if(selectedPackage) {
      newDuration -= Number(selectedPackage.duration);
      newTotalPrice -= Number(selectedPackage.price);
    }
    
    newDuration += Number(packageService.duration);
    newTotalPrice += Number(packageService.price);

    setSelectedPackage(packageService);
    setForm({
      ...form,
      listPackage: [{
        packageId: packageService.id,
        quantity: 1
      }],
      duration: newDuration,
      totalPrice: newTotalPrice
    });
  };
  
  const handleSelectExtraService = (extraService) => {
    let newExtraServiceIds = [...form.extraServiceIds];
    let newDuration = form.duration;
    let newTotalPrice = form.totalPrice;
    
    if (newExtraServiceIds.includes(extraService.id)) {
      newExtraServiceIds = newExtraServiceIds.filter(item => item !== extraService.id);
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
      totalPrice: newTotalPrice
    });
  };
  
  const selectedListPackage = () => {
    if(form.listPackage.length > 0) {
      const result = _.map(form.listPackage, (item) => {
        const packageData = _.find(packages, { id: item.packageId });
        return { ...packageData, quantity: item.quantity}
      })
      return result;
    }
    return [];
  }
  
  const selectedListExtraService = () => {
    if(form.extraServiceIds.length > 0) {
      const result = _.map(form.extraServiceIds, (item) => {
        return _.find(extraServices, { id: item });
      })
      return result;
    }
    return [];
  }
    
  const submitContinue = () => {
    const date = new Date(form.date);
    const time = new Date(form.time);
    const dateTime = setSeconds(setMinutes(setHours(date, time.getHours()), time.getMinutes()), time.getSeconds());
    setForm({ ...form, dateTime });
    setIsVisibleModalLocation(!isVisibleModalLocation)
  }
  
  const submit = async () => {
    setIsLoading(true)
    try {
      await bookingApi.newBooking(form);
      router.replace('/activities')
    } catch (error) {
      Alert.alert('Error', error.message)
      console.log('winter-booking-error', error)  
    } finally {
      setIsLoading(false)
    }
  }
  
  if(loadingService || loadingExtraService || loadingAddress) {
    return (
      <LoadingScreen />
    )
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
          <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
            <Text className='text-base text-white font-pmedium'>Văn phòng - Tầng 5, 2 Dương Đình Nghệ, Yên Hoà, Nam Từ Niêm, Hà Nội, Việt Nam</Text>
          </View>
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
          {(packages && packages.length > 0) ? (
            <View>
              {packages.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  className='mt-2' 
                  activeOpacity={0.7}
                  onPress={() => handleSelectPackage(item)}
                >
                  <View 
                    className={`${item.id === selectedPackage?.id ? 'border border-secondary' : ''} w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start`}
                  >
                    <Text className='text-base text-white font-pmedium'>{item.name}</Text>
                    <Text className='text-sm text-gray-400 font-pregular mt-1'>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              <Text className='text-base text-gray-100 font-pmedium'>Không có dữ liệu</Text>
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
          {(extraServices && extraServices.length > 0) ? (
            <View>
              {extraServices.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  className='mt-2' 
                  activeOpacity={0.7}
                  onPress={() => handleSelectExtraService(item)}
                >
                  <View 
                    className={`${form.extraServiceIds.includes(item.id) ? 'border border-secondary' : ''} w-full py-4 px-4 bg-black-100 rounded-2xl flex-row justify-start items-start space-x-4`}
                  >
                    <Image 
                      source={{ uri: `${iconBaseURL}/${item.icon}` }}
                      className='w-5 h-5'
                      resizeMode='contain'
                    />
                    <Text className='text-base text-white font-pmedium'>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              <Text className='text-base text-gray-100 font-pmedium'>Không có dữ liệu</Text>
            </View>
          )}
        </View>
        
        <FieldDateTimePicker 
          title='Ngày làm việc'
          icon={icons.schedule}
          value={form.date}
          mode="date"
          handleChangeDateTime={(selectedDate) => setForm({ ...form, date: selectedDate })}
          otherStyles='mt-8'
        />
        
        <FieldDateTimePicker 
          title='Thời gian làm việc'
          icon={icons.clockColor}
          value={form.time}
          mode="time"
          handleChangeDateTime={(selectedDate) => setForm({ ...form, time: selectedDate })}
          otherStyles='mt-8'
        />
        
        <FormField 
          title='Ghi chú'
          icon={icons.note}
          value={form.note}
          placeholder='Thêm ghi chú hoặc mô tả của bạn ...'
          handleChangeText={(e) => setForm({ ...form, note: e })}
          otherStyles="mt-8"
        />
        
      </ScrollView>
      <TouchableOpacity
        onPress={submitContinue}
        activeOpacity={0.7}
        className={`flex-row mx-3 rounded-xl min-h-[62px] justify-between items-center mt-4 mb-4 ${form.duration === 0 || form.date === null || form.time === null || form.totalPrice === 0 ? 'bg-gray-200 opacity-50' : 'bg-secondary'}`}
        disabled={form.duration === 0 || form.date === null || form.time === null || form.totalPrice === 0}
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
        address={listAddress.find(item => item.isDefault)}
        user={user}
        service={service}
        selectedListPackage={selectedListPackage()}
        selectedListExtraService={selectedListExtraService()}
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={submit}
      />
    </SafeAreaView>
  )
}

export default Service