/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import 'react-native-gesture-handler';

import Source from './Source'
const App: () => Node = () => {
  // navigator.geolocation = require('react-native-geolocation-service');
  return (
    <Source />
  )
};

export default App;
