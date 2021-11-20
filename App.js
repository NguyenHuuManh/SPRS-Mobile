/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type { Node } from 'react';
import React from 'react';
import Source from './Source';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/core';
import { getFcmToken, notificationListener, networkListener } from './Source/Services/notificationService';



const App: () => Node = () => {
  // const navigation = useNavigation();
  React.useEffect(() => {
    notificationListener();

    networkListener();
  }, [])

  return (
    <Source />
  )
};

export default App;
