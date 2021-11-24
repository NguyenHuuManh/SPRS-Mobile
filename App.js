/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Node, useEffect } from 'react';
import Source from './Source';
import { networkListener } from './Source/Services/notificationService';



const App: () => Node = () => {
  // const navigation = useNavigation();
  useEffect(() => {
    networkListener();
  }, [])
  return (
    <Source />
  )
};

export default App;
