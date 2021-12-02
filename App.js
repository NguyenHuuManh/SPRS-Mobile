/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Node, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Source from './Source';
import { handleLocationPermission } from './Source/Helper/FunctionCommon';
import { loginSuccess } from './Source/Redux/Actions/UserActions';
import ActionTypes from './Source/Redux/ActionTypes';
import { networkListener, resetReducerUser } from './Source/Services/notificationService';
import { store } from './Source/Store';
const App: () => Node = () => {
  // const navigation = useNavigation();
  const userReducer = store.getState().userReducer;
  useEffect(() => {
    networkListener();
    handleLocationPermission().then((e) => {
      console.log("permission", e);

    });
    // if (userReducer?.type !== ActionTypes.LOGIN_SUCCESS) {
    //   resetReducerUser();
    // }
  }, [])
  return (
    <Source />
  )
};

export default App;
