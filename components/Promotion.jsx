import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { REACT_APP_BASE_ICON_URL } from '@env'
import PromotionModal from './PromotionModal'
import { promotionApi } from '../services/api'
import Toast from 'react-native-toast-message'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const PromotionItem = ({ activeItem, item }) => {
  const imageURL = `${REACT_APP_BASE_ICON_URL}/${item.image}`
  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const submit = async () => {
    setIsLoading(true)
    try {
      await promotionApi.claim(item.id);
      router.replace('/home')
    } catch (error) {
      console.log('promotion-error', error)
      Toast.show({
        type: 'error',
        text1: error.message || 'Có lỗi xảy ra khi nhận khuyến mãi',
      });
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <Animatable.View
        className='mr-5'
        animation={activeItem === item.id ? zoomIn : zoomOut}
        duration={500}
      >
        <TouchableOpacity 
          className='relative justify-center items-center' 
          activeOpacity={0.7}
          onPress={() => setIsModalVisible(true)}
        >
          <ImageBackground 
            source={{ uri: imageURL }}
            className='w-64 h-48 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />
        </TouchableOpacity>    
      </Animatable.View>
      <PromotionModal
        promotion={item}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelect={submit}
      />
    </>
  )
}

const Promotion = ({ promotions }) => {
  const [activeItem, setActiveItem] = useState(promotions[0])
  
  const viewableItemsChanges = ({ viewableItems }) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  
  return (
    <FlatList 
      data={promotions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PromotionItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 220 }}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}

export default Promotion