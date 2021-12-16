/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Node, useEffect } from 'react';
import { BackHandler } from "react-native";
import Source from './Source';
import { handleLocationPermission } from './Source/Helper/FunctionCommon';
import { getCurrentRoute, reset } from './Source/Helper/RootNavigation';
import { networkListener } from './Source/Services/notificationService';
const App: () => Node = () => {
  // const userReducer = store.getState().userReducer;
  // function handleBackPress() {
  //   const route = getCurrentRoute();
  //   console.log('route', route)
  //   if ((route.name == 'DetailPoint' || route.name == 'UpdateStorePoint' || route.name == 'UpdateReliefPoint' || route.name == 'SOS') && route.params?.from == "MapCluser") {
  //     reset('MapCluser');
  //     return true
  //   }
  //   return false;
  // }

  // const onBackPress = (callback) => {
  //   BackHandler.addEventListener('hardwareBackPress', callback);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', callback);
  //   };
  // };
  useEffect(() => {
    networkListener();
    handleLocationPermission().then((e) => {
      console.log("permission", e);
    });
    // onBackPress(handleBackPress);
  }, [])
  return (
    <Source />
  )
};

export default App;
