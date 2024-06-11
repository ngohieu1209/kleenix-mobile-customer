import { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { connectWithSocketServer, socketDisconnect, getSocketInstance } from '../../services/socket/socket-connection'

const TabIcon = ({ icon, color, name, focused, number }) => {
  return (
    <View>
      <View className='items-center justify-center gap-2'>
        <Image 
          source={icon}
          resizeMode='contain'
          tintColor={color}
          className="w-6 h-6"
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
          {name}
        </Text>
      </View>
      {(Number(number) > 0) && (
        <View className={`absolute right-3 -top-2 rounded-full border ${focused ? 'border-secondary-100 bg-yellow-300' : 'border-gray-200 bg-gray-50'} h-5 w-5 items-center justify-center`}>
          <Text className={`font-psemibold text-xs text-primary`}>
            {number}
          </Text>
        </View>
      )}
    </View>
  )
}

const TabsLayout = () => {
  const { user } = useGlobalContext();
  const [numberNotification, setNumberNotification] = useState(0);
  
  useEffect(() => {
    if(user && user.verify) {
      connectWithSocketServer(user.id);
      const socket = getSocketInstance();
      socket.on('count-notification-unread', (payload) => {
        setNumberNotification(payload.count);
      });
      socket.emit('customer-notifications')
      return () => {
        socketDisconnect();
      }
    }
  }, [user])
  
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{ 
            title: 'Home', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.home} color={color} name="Trang chủ" focused={focused} />
            )}}
        />
        <Tabs.Screen
          name='activities'
          options={{ 
            title: 'Activities', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.toDoList} color={color} name="Hoạt động" focused={focused} />
            )}}
        />
        <Tabs.Screen
          name='notification'
          options={{ 
            title: 'Notification', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.notification} color={color} name="Thông báo" focused={focused} number={numberNotification}/>
            )}}
        />
        <Tabs.Screen
          name='profile'
          options={{ 
            title: 'Profile', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.profile} color={color} name="Tài khoản" focused={focused} />
            )}}
        />

      </Tabs>
    </>
  )
}

export default TabsLayout