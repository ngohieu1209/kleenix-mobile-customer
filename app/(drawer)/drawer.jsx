import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation, router, usePathname } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import { images } from '../../constants'
import InfoBox from '../../components/InfoBox';

const DrawerSideBar = (props) => {
  const pathname = usePathname()
  const navigation = useNavigation()
  
  return (
    <DrawerContentScrollView {...props}>
      <View className='flex-1 w-full'>
        <View className='justify-center items-center mt-16'>
          <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
            <Image 
              source={images.logo}
              className='w-[90%] h-[90%] rounded-lg'
              resizeMode='contain'
            />
          </View>
          <InfoBox 
            title={"Ngo Hieu"}
            containerStyles='mt-5'
            titleStyles='text-lg'
          />
        </View>
        
        <DrawerItem
          label='Địa chỉ'
          labelStyle={{ color: pathname == '/address' ? "#FFA001" : "#CDCDE0" }}
          icon={({ color, size }) => (
              <AntDesign name="home" size={size} color={pathname == '/address' ? "#FFA001" : "#CDCDE0"} />
          )}
          style={{
            borderWidth: 1,
            borderColor: `${pathname == '/address' ? "#FFA001" : "#CDCDE0"}`,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={() => router.push('/address')}
        />
        <DrawerItem
          label='Home'
          labelStyle={{ color: pathname == '/home' ? "#FFA001" : "#CDCDE0" }}
          icon={({ color, size }) => (
              <AntDesign name="home" size={size} color={pathname == '/home' ? "#FFA001" : "#CDCDE0"} />
          )}
          style={{
            borderWidth: 1,
            borderColor: `${pathname == '/home' ? "#FFA001" : "#CDCDE0"}`,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={() => router.push('/home')}
        />
        <DrawerItem
          label='Bookmark'
          labelStyle={{ color: pathname == '/bookmark' ? "#FFA001" : "#CDCDE0" }}
          icon={({ color, size }) => (
              <AntDesign name="home" size={size} color={pathname == '/bookmark' ? "#FFA001" : "#CDCDE0"} />
          )}
          style={{
            borderWidth: 1,
            borderColor: `${pathname == '/bookmark' ? "#FFA001" : "#CDCDE0"}`,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={() => router.push('/bookmark')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerSideBar;
