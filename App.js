/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import GetLocation from 'react-native-get-location'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [region, setRegion] = useState({
    latitude: 21.0263084,
    longitude: 105.7709134,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location, "location");
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }
  useEffect(() => {
    getCurrentLocation();
  }, [])

  const onChangeRegion = (region) => {
    setRegion(region)
  }
  return (
    <View style={{ position: 'relative', height: 800 }}>
      <MapView
        mapType={"standard"}
        provider={PROVIDER_GOOGLE}
        style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' }}
        initialRegion={{
          latitude: 21.0263084,
          longitude: 105.7709134,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => { console.log(e, "e") }}
      >
        <Marker
          coordinate={{ latitude: 21.0263084, longitude: 105.7709134 }}
          title={"marker.title"}
          description={"marker.description"}
        />
      </MapView>
    </View>
  );
};

export default App;
