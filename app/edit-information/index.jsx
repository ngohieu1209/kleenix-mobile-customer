import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { REACT_APP_BASE_ICON_URL } from '@env'

import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'

import BackButtonHeader from '../../components/BackButtonHeader'
import FormField from '../../components/FormField'
import * as ImagePicker from 'expo-image-picker'
import { userApi } from '../../services/api'
import LoadingScreen from '../../components/LoadingScreen'
import ChangePasswordModal from '../../components/ChangePasswordModal'
import UploadAvatarModal from '../../components/UploadAvatarModal'
import CustomButton from '../../components/CustomButton'
import Toast from 'react-native-toast-message'

const EditInformation = () => {
  const iconBaseURL = `${REACT_APP_BASE_ICON_URL}`
  const { user, updateUser } = useGlobalContext();
  const [form, setForm] = useState({
    name: '',
    avatar: null
  })
  const [isHandleLoading, setIsHandleLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isVisibleModalAvatar, setIsVisibleModalAvatar] = useState(false)
  
  useEffect(() => {
    setForm({ ...form, name: user.name})
  }, [user])
  
  const uploadAvatar = async (mode) => {
    try {
      let result = {};
      if(mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        })  
      } else {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
      }
      if(!result.canceled) {
        // save avatar
        await saveAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log('upload-avatar-error', error)
      ToastAndroid.SHORT('Có lỗi xảy ra khi tải ảnh lên')
      setIsVisibleModalAvatar(false);
    }
  }
  
  const saveAvatar = async (image) => {
    try {
      // update displayed image
      setForm({ ...form, avatar: image });
      setIsVisibleModalAvatar(false);
    } catch (error) {
      throw error;
    }
  }
  
    
  const handleSubmit = async () => {
    setIsHandleLoading(true)
    try {
      const updatedProfile = await userApi.editProfile(form)
      updateUser({
        name: updatedProfile.name,
        avatar: updatedProfile.avatar
      })
      router.replace('profile')
    } catch (error) {
      console.log('edit-profile-error', error)
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra khi cập nhật thông tin',
      });
    } finally {
      setIsHandleLoading(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <BackButtonHeader title={"Chỉnh sửa thông tin"} />
      <ScrollView>
        <View className='px-4 mt-6 justify-center items-center'>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsVisibleModalAvatar(!isVisibleModalAvatar)}
          >
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              { form.avatar ? (
                  <Image 
                    source={{ uri: form.avatar }}
                    className='w-[90%] h-[90%] rounded-lg'
                    resizeMode='cover'
                  />
              ) : (
                <>
                  {user.avatar ? (
                    <Image 
                      source={{ uri: `${iconBaseURL}/${user.avatar}` }}
                      className='w-[90%] h-[90%] rounded-lg'
                      resizeMode='cover'
                    />
                  ) : (
                    <Image 
                      source={icons.profile}
                      className='w-[90%] h-[90%] rounded-lg'
                      resizeMode='cover'
                    />
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
          <FormField 
            title="Họ và tên"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles='my-7'
          />
          
          <TouchableOpacity
            className='w-[50%] h-12 px-4 bg-secondary rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
            activeOpacity={0.7}
            onPress={() => setIsVisibleModal(!isVisibleModal)}
          >
            <Text className='text-black text-base font-bold'>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomButton 
        title={isHandleLoading ? <ActivityIndicator color={'#CDCDE0'} size={32} /> : 'Lưu'}
        handlePress={handleSubmit}
        containerStyles='mx-3 mb-4'
        isLoading={isHandleLoading || (user && form.name === user.name && form.avatar === null)}
      />
      <ChangePasswordModal 
        visible={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        // onSelect={submit}
      />
      <UploadAvatarModal 
        visible={isVisibleModalAvatar}
        onClose={() => setIsVisibleModalAvatar(false)}
        onCameraPress={() => uploadAvatar()}
        onGalleryPress={() => uploadAvatar('gallery')}
      />
    </SafeAreaView>
  )
}

export default EditInformation