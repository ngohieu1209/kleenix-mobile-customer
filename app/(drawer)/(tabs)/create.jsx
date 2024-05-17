import { View, Text, ScrollView, TouchableOpacity, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import FieldDateTimePicker from '../../../components/FieldDateTimePicker'
import  DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown'

const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
    date: null
  })
  
  const submit = () => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert('Please fill in all the fields')
    }
    
    setUploading(true)
    
    try {
      
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false)
    }
  }
  
  // const [date, setDate] = useState(new Date(1598051730000));
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setShow(false);
    // setDate(currentDate);
    setForm({ ...form, date: currentDate })
  };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Upload Video
        </Text>
        
        {/* <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          timeZoneName={'Asia/Ho_Chi_Minh'}
          minimumDate={new Date()}
        />
      )} */}
      
        <FieldDateTimePicker 
          title='Ngày'
          value={form.date}
          mode="date"
          handleChangeDateTime={(selectedDate) => setForm({ ...form, date: selectedDate })}
        />
        
        <FormField 
          title='Video Title'
          value={form.title}
          placeholder='Give your video a catch title ...'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />
        
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity>
            <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              
            </View>
          </TouchableOpacity>
        </View>
        
        <Dropdown 
          className='mt-8 w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
          data={[
            { label: 'Hà Nội', value: 'hn' },
            { label: 'HCM', value: 'hmc' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Hà Nội', value: 'hn' },
          ]}
          // selectedTextStyle={{ color: 'white' }}
          placeholder='-- Thành phố --'
          placeholderStyle={{ color: '#7b7b8b' }}
          labelField="label"
          valueField="value"
          search
          searchPlaceholder='Tìm kiếm thành phố'
          containerStyle={{ backgroundColor: 'rgb(30,30,45)', borderRadius: 10, borderColor: 'rgb(30,30,45)'}}
          itemTextStyle={{ color: 'white' }}
          selectedTextStyle={{ borderColor: 'red'}}
          activeColor='#7b7b8b'
          inputSearchStyle={{ borderColor: 'rgb(30,30,45)', color: 'white' }}
        />
        
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>
          <TouchableOpacity>
            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
              
            </View>
          </TouchableOpacity>
        </View>
        
        <FormField 
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />
        
        <CustomButton 
          title='Submit & Publish'
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create