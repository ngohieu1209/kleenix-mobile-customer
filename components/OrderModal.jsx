import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalLine from './HorizontalLine'
import { fAddress } from '../utils/format-address'
import { fDateTime } from '../utils/format-time'
import { fCurrency } from '../utils/format-currency'
import { addMinutes } from 'date-fns'

const OrderModal = ({ visible, onClose, onSelect, order, address, user, service, selectedListPackage, selectedListExtraService, selectedPromotion}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClose = () => {
    onClose()
  }

  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <View className='flex my-6 px-4 space-y-6'>
          <View className='flex-row'>
            <View className='flex-1'>
              <Text className='text-white font-pmedium text-base'>
                Đơn hàng
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image 
                source={icons.close}
                className='w-4 h-4'
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          <View className='space-y-2'>
            <View className='flex-row space-x-2'>
              <Image 
                source={icons.location}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-base text-gray-100 font-pmedium'>
                Thông tin đặt lịch
              </Text>
            </View>
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
              {/* KHÁCH HÀNG */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>Khách hàng</Text>
              <Text className='text-base text-white font-pmedium'>{user.name}</Text>
              <Text className='text-base text-white font-pmedium'>{`0${user.phoneNumber}`}</Text>
              {/* ĐỊA CHỈ */}
              <HorizontalLine />
              <Text className='text-sm text-gray-100 font-pregular mb-1'>Địa chỉ</Text>
              <Text className='text-base text-white font-pmedium'>{fAddress(address)}</Text>
              {/* THỜI GIAN BẮT ĐẦU */}
              <HorizontalLine />
              <Text className='text-sm text-gray-100 font-pregular mb-1'>Thời gian bắt đầu</Text>
              <Text className='text-base text-white font-pmedium'>{fDateTime(order.dateTime)}</Text>
              {/* THỜI GIAN KẾT THÚC DỰ KIẾN */}
              <HorizontalLine />
              <Text className='text-sm text-gray-100 font-pregular mb-1'>Thời gian kết thúc dự kiến</Text>
              <Text className='text-base text-white font-pmedium'>{fDateTime(addMinutes(new Date(order.dateTime), order.duration))}</Text>
              {/* DỊCH VỤ */}
              <HorizontalLine />
              <Text className='text-sm text-gray-100 font-pregular mb-1'>Dịch vụ: {service.name}</Text>
              {selectedListPackage.map((item, index) => (
                <Text key={index} className='text-base text-white font-pmedium'>• {item.name} {item.quantity > 1 ? `x ${item.quantity}` : ''}</Text>
              ))}
              {/* DỊCH VỤ THÊM */}
              {selectedListExtraService.length > 0 && (
                <>
                  <HorizontalLine />
                  <Text className='text-sm text-gray-100 font-pregular mb-1'>Gói dịch vụ thêm</Text>
                  {selectedListExtraService.map((item, index) => (
                    <Text key={index} className='text-base text-white font-pmedium'>• {item.name}</Text>
                  ))}
                </>
              )}
              {/* GHI CHÚ */}
              <HorizontalLine />
              <Text className='text-sm text-gray-100 font-pregular mb-1'>Ghi chú</Text>
              <Text className='text-base text-white font-pmedium'>{order.note || 'Không có'}</Text>
            </View>
          </View>
          
          <View className='space-y-2 mt-6'>
            <View className='flex-row space-x-2'>
              <Image 
                source={icons.location}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-base text-gray-100 font-pmedium'>
                Chi phí
              </Text>
            </View>
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
              {/* PHÍ DỊCH VỤ */}
              <Text className='text-base text-white font-pmedium mb-1'>Phí dịch vụ</Text>
              {selectedListPackage.map((item) => (
                  <View key={item.id} className='flex-row justify-between items-center w-11/12 my-1'>
                    <Text className='text-sm text-gray-100 font-pregular'>
                      • {item.name} {item.quantity > 1 ? `x ${item.quantity}` : ''}
                    </Text>
                    <Text className='text-sm text-gray-100 font-pregular'>
                      {fCurrency(Number(item.price) * item.quantity)}
                    </Text>
                  </View>
              ))}
              {/* PHÍ DỊCH VỤ THÊM */}
              {selectedListExtraService.length > 0 && (
                  <>
                    <HorizontalLine />
                    <Text className='text-base text-white font-pmedium mb-1'>Phí dịch vụ thêm</Text>
                    {selectedListExtraService.map((item) => (
                      <View key={item.id} className='flex-row justify-between items-center w-11/12 my-1'>
                        <Text className='text-sm text-gray-100 font-pregular'>
                          • {item.name}
                        </Text>
                        <Text className='text-sm text-gray-100 font-pregular'>
                          {fCurrency(Number(item.price))}
                        </Text>
                      </View>
                    ))}
                  </>
                )}
              {/* MÃ KHUYẾN MÃI */}
              {selectedPromotion && (
                  <>
                    <HorizontalLine />
                    <Text className='text-base text-white font-pmedium mb-1'>Khuyến mãi</Text>
                      <View className='flex-row justify-between items-center w-11/12 my-1'>
                        <Text className='text-sm text-gray-100 font-pregular'>
                          {selectedPromotion.name}
                        </Text>
                        <Text className='text-sm text-gray-100 font-pregular'>
                          - {fCurrency(Number(selectedPromotion.discount))}
                        </Text>
                      </View>
                  </>
                )}
              {/* TỔNG CỘNG */}
              <HorizontalLine />
              <View className='flex-row justify-between items-center w-11/12 my-1'>
                <Text className='text-base text-secondary font-psemibold'>
                  TỔNG CỘNG
                </Text>
                <Text className='text-base text-secondary font-psemibold'>
                  {fCurrency(Number(order.totalPrice))}
                </Text>
              </View>
            </View>
          </View>
          
          <View className='space-y-2 mt-6'>
            <View className='flex-row space-x-2'>
              <Image 
                source={icons.location}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-base text-gray-100 font-pmedium'>
                Hình thức thanh toán
              </Text>
            </View>
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
              {/* HÌNH THỨC THANH TOÁN */}
              <View className='flex-row justify-between items-center w-11/12 my-1'>
                <Text className='text-base text-white font-psemibold'>
                  THANH TOÁN
                </Text>
                <Text className='text-base text-white font-psemibold'>
                  {order.paymentStatus === 'KPAY' ? 'KPAY' : 'Tiền mặt'}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={onSelect}
          activeOpacity={0.7}
          className={`mx-3 rounded-xl min-h-[62px] justify-center items-center mt-4 mb-4 bg-secondary`}
        >
          <Text className={`text-primary font-psemibold text-lg mx-4`}>
            Xác nhận đặt lịch
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  )
}

export default OrderModal