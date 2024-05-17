import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import DrawerSideBar from './drawer';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ 
          headerShown: false,
          drawerActiveTintColor: '#FFA001',
          drawerInactiveTintColor: '#CDCDE0',
          drawerStyle: {
            backgroundColor: '#161622',
          },
        }}
        drawerContent={(props) => <DrawerSideBar {...props} />}
      >
      </Drawer>
    </GestureHandlerRootView>
  );
}
