import { View, Text, Modal, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

import useFetchData from '../services/useFetchData'
import { getListProvince, getListDistrict, getListWard } from '../services/apiLocation'

import { Dropdown } from 'react-native-element-dropdown'
import FormField from './FormField'

const LocationModal = ({ visible, onClose, onSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: listProvince } = useFetchData(getListProvince())
  const [listDistrict, setListDistrict] = useState([])
  const [listWard, setListWard] = useState([])
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [form, setForm] = useState({
    province: null,
    district: null,
    ward: null,
    street: null,
    long: '105.804817',
    lat: '21.028511',
  })
  
  const getDistricts = async (provinceId) => {
    const data = await getListDistrict(provinceId)
    setListDistrict(data)
  }
  
  const getWards = async (districtId) => {
    const data = await getListWard(districtId)
    setListWard(data)
  }
  
  useEffect(() => {
    if(province) {
      getDistricts(province)
    }
  }, [province])
  
  
  useEffect(() => {
    if(district) {
      getWards(district)
    }
  }, [district])
  
  const handleClose = () => {
    setProvince(null)
    setDistrict(null)
    setWard(null)
    setForm({
      province: null,
      district: null,
      ward: null,
      street: null,
      long: '105.804817',
      lat: '21.028511',
    })
    onClose()
  }
  
  const submit = () => {
    onSelect(form)
    handleClose()
  }
  
  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <ScrollView>
          
          <View className='flex my-6 px-4 space-y-6'>
            <View className='flex-row'>
              <View className='flex-1'>
                <Text className='text-white font-pmedium text-base'>
                  Thêm địa chỉ
                </Text>
              </View>
              <TouchableOpacity onPress={handleClose}>
                <Image 
                  source={icons.close}
                  className='w-4 h-4'
                />
              </TouchableOpacity>
            </View>
            <Dropdown 
              className='mt-8 w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
              data={listProvince}
              placeholder='-- Chọn thành phố --'
              placeholderStyle={{ color: '#7b7b8b' }}
              labelField="province_name"
              valueField="province_id"
              search
              searchPlaceholder='Tìm kiếm thành phố'
              containerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10, borderColor: 'rgb(30,30,45)'}}
              itemTextStyle={{ color: 'white' }}
              activeColor='#1E1E2D'
              itemContainerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10 }}
              inputSearchStyle={{ borderColor: 'rgb(30,30,45)', color: 'white' }}
              value={province}
              selectedTextStyle={{ color: 'white' }}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                setProvince(item.province_id);
                // handleState(item.value);
                setForm({ ...form, province: item.province_name });
              }}
            />
            {province && (
              <Dropdown 
                className='mt-8 w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
                data={listDistrict}
                placeholder='-- Chọn quận huyện --'
                placeholderStyle={{ color: '#7b7b8b' }}
                labelField="district_name"
                valueField="district_id"
                containerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10, borderColor: 'rgb(30,30,45)'}}
                itemTextStyle={{ color: 'white' }}
                activeColor='#1E1E2D'
                itemContainerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10 }}
                inputSearchStyle={{ borderColor: 'rgb(30,30,45)', color: 'white' }}
                value={district}
                selectedTextStyle={{ color: 'white' }}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDistrict(item.district_id);
                  // handleState(item.value);
                  setForm({ ...form, district: item.district_name });
                }}
              />
            )}
            {district && (
              <Dropdown 
                className='mt-8 w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
                data={listWard}
                placeholder='-- Chọn phường xã --'
                placeholderStyle={{ color: '#7b7b8b' }}
                labelField="ward_name"
                valueField="ward_id"
                containerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10, borderColor: 'rgb(30,30,45)'}}
                itemTextStyle={{ color: 'white' }}
                activeColor='#1E1E2D'
                itemContainerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10 }}
                inputSearchStyle={{ borderColor: 'rgb(30,30,45)', color: 'white' }}
                value={ward}
                selectedTextStyle={{ color: 'white' }}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setWard(item.ward_id);
                  // handleState(item.value);
                  setForm({ ...form, ward: item.ward_name });
                }}
              />
            )}
            {ward && (
              <FormField 
                value={form.street}
                placeholder='Số nhà, tên đường ...'
                handleChangeText={(e) => setForm({ ...form, street: e })}
              />
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={submit}
          activeOpacity={0.7}
          className={`mx-3 rounded-xl min-h-[62px] justify-center items-center mt-4 mb-4 ${form.province === null || form.district === null || form.ward === null || form.street === null ? 'bg-gray-200 opacity-50' : 'bg-secondary'}`}
          disabled={form.province === null || form.district === null || form.ward === null || form.street === null}
        >
          <Text className={`text-primary font-psemibold text-lg mx-4`}>
            Thêm địa chỉ
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  )
}

export default LocationModal