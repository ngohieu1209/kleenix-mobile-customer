import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ServiceLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='service'
          options={{
            headerShown: false
          }}
        />
      </Stack>
      
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default ServiceLayout