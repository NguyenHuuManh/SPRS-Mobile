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
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { firebaseApp } from './Firebase/config';
import auth from '@react-native-firebase/auth';
const App: () => Node = () => {

  // const [region, setRegion] = useState({
  //   latitude: 21.0263084,
  //   longitude: 105.7709134,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });
  // const [marker, setMarker] = useState({
  //   latitude: 21.0263084,
  //   longitude: 105.7709134
  // })


  // const getCurrentLocation = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       console.log(location, "location");
  //     })
  //     .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //     })
  // }
  // useEffect(() => {
  //   getCurrentLocation();
  // }, [])

  // const onChangeRegion = (region) => {
  //   setRegion(region)
  // }
  // return (
  //   <View style={{ position: 'relative', height: 600 }}>
  //     <MapView
  //       provider={PROVIDER_GOOGLE}
  //       style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' }}
  //       showsUserLocation
  //       region={region}
  //       // onRegionChangeComplete={onChangeRegion}

  //       onPress={(e) => {
  //         setMarker(e.nativeEvent.coordinate)
  //       }}
  //     >
  //       <Marker
  //         coordinate={marker}
  //         title={"marker.title"}
  //         description={"marker.description"}
  //       />
  //     </MapView>
  //   </View>
  // );
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log("user", user)
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const signin = () => {
    console.log('signed in!');
    auth()
      .signInWithEmailAndPassword('manhnhhe130564@fpt.edu.vn', 'manhtkmd')
      .then((e) => {
        console.log('signed in!');
        console.log('e', e);
        setUser(e);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }


  if (initializing) return null;

  // if (!user) {
  //   return (
  //     <>
  //       <View style={{ width: 200, padding: 20 }}>
  //         <TouchableOpacity onPress={() => { signin() }}>
  //           <Text>Login</Text>
  //         </TouchableOpacity>
  //       </View>

  //     </>
  //   );
  // }

  return (
    <View>
      <View style={{ width: 200, padding: 20 }}>
        <Button onPress={signin} title="Login" />
      </View>
    </View>
  );
};

export default App;
