import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { fCurrency } from '../utils/format-currency'

const FinanceCard = () => {
  const { user } = useGlobalContext()
  return (
    <View className='flex-row justify-around'>
      <View 
        className='border-2 border-black-200 w-[45%] px-4 py-1 bg-black-100 rounded-2xl focus:border-secondary space-y-2'
      >
        <Text className='text-base text-white font-psemibold'>
          K-Pay
        </Text>
        <Text className='text-base text-secondary-200 font-pmedium'>
          {fCurrency(Number(user.kPay))}
        </Text>
      </View>
      <View 
        className='border-2 border-black-200 w-[45%] px-4 py-1 bg-black-100 rounded-2xl focus:border-secondary space-y-2'
      >
        <Text className='text-base text-white font-psemibold'>
          K-Point
        </Text>
        <Text className='text-base text-secondary-200 font-pmedium'>
          {user.kPoints}
        </Text>
      </View>
    </View>
  )
}

export default FinanceCard