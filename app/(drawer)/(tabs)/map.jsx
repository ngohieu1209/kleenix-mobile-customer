import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getLocationFromCoordinates } from '../../../services/apiLocation';
import LocationModal from '../../../components/LocationModal';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // [lat, long]
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Quyền truy cập vị trí bị từ chối');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if(location.coords) {
        reverseGeoCode({lat: location.coords.latitude, long: location.coords.longitude})
      }
      setLocation(location);
    })();
  }, []);
  
  const reverseGeoCode = async ({lat, long}) => {
    const data = await getLocationFromCoordinates(lat, long)
    setCurrentLocation(data[0])
  }
  
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)

  return (
    <>
      <ImageBackground
        className='flex-1 justify-center items-center bg-primary'
      >
        <TouchableOpacity
          onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
        >
          <Text className='text-white'>
            Drawer
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      
      <LocationModal 
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={val => console.log('winter-val', val)}
      />
    </>
    // <View style={styles.container}>
    //   {location ? (
    //     <MapView
    //       style={styles.map}
    //       initialRegion={{
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       }}
    //     >
    //       <Marker
    //         coordinate={{
    //           latitude: location.coords.latitude,
    //           longitude: location.coords.longitude,
    //         }}
    //         title="Vị trí của bạn"
    //       />
    //       <Text>Hello</Text>
    //     </MapView>
    //   ) : null}
    //   {errorMsg ? <Text>{errorMsg}</Text> : null}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;