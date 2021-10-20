
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { isEmpty } from 'lodash';
import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrawerCustom from '../Components/DrawerCustom';
import TabBar from '../Components/TabBar';
import { profileActions } from '../Redux/Actions';
import ActionTypes from '../Redux/ActionTypes';
import { RootState } from '../Redux/Reducers';
import { AddLocation, Home, Signin } from '../Screens';
import ForgotPass from '../Screens/ForgotPass';
import ChangePassword from '../Screens/ForgotPass/ChangePassword';
import ComfirmOTP from '../Screens/ForgotPass/ComfirmOTP';
import ReliefPoints from '../Screens/ReliefPoints';
import Map from '../Screens/Map';
import Profile from '../Screens/Profile';
import Personal from '../Screens/Profile/Personal';
import Signup from '../Screens/Signup';
import Notification from '../Screens/Notification';
import ChangePasswordAuth from '../Screens/ChangePasswordAuth';
import UserReducer from '../Redux/Reducers/UserReducer';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuStack = createStackNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RootStack = createStackNavigator();
const GuestStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const GuestStackScreen = () => (
    <GuestStack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
        <GuestStack.Screen name="Map" component={Map} options={{ title: "Map", animationEnabled: true }} />
    </GuestStack.Navigator>
)

const AuStackScreen = () => (
    <AuStack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false }}>
        <AuStack.Screen name="Signin" component={Signin} options={{ title: "Signin", animationEnabled: true }} />
        <AuStack.Screen name="Signup" component={Signup} options={{ title: "Signup", animationEnabled: true }} />
        <AuStack.Screen name="ForgotPass" component={ForgotPass} options={{ title: "ForgotPass", animationEnabled: true }} />
        <AuStack.Screen name="ComfirmOTP" component={ComfirmOTP} options={{ title: "ComfirmOTP", animationEnabled: true }} />
        <AuStack.Screen name="ChangePassword" component={ChangePassword} options={{ title: "ChangePassword", animationEnabled: true }} />
    </AuStack.Navigator>
)

const MainStackScreen = () => (
    <MainStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={Home} options={{ title: "Home", animationEnabled: true }} />
    </MainStack.Navigator>
)

const ProfileStackScreen = () => (
    <ProfileStack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="Profile" component={Profile} options={{ title: "Profile", animationEnabled: true }} />
    </ProfileStack.Navigator>
)

const NotificationStackScreen = () => (
    <NotificationStack.Navigator initialRouteName="Notification" screenOptions={{ headerShown: false }}>
        <NotificationStack.Screen name="Notification" component={Notification} options={{ title: "Notification", animationEnabled: true }} />
    </NotificationStack.Navigator>
)

const TabScreens = () => (
    <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => { return <TabBar {...props} /> }}>
        <Tabs.Screen name="Trang chủ" component={MainStackScreen} />
        <Tabs.Screen name="Bản đồ" component={(Map)} />
        <Tabs.Screen name="Thông báo" component={NotificationStackScreen} />
        <Tabs.Screen name="Cá nhân" component={ProfileStackScreen} />
    </Tabs.Navigator>
)

const DrawScreen = () => (
    <Drawer.Navigator initialRouteName="TabScreen2" screenOptions={{ headerShown: false, swipeEnabled: false, gestureEnabled: false }} drawerContent={(props) => <DrawerCustom {...props} />}>
        <Drawer.Screen name="TabScreen" component={TabScreens} />
        <Drawer.Screen name="TabScreen2" component={Map} />
    </Drawer.Navigator>
)
const RootStackScreen = () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const isUserToken = !isEmpty(userReducer?.data?.token || {})
    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {
        console.log("userReducer", userReducer)
        if (!isEmpty(userReducer?.data?.token || {})) {
            dispatch(profileActions.profileRequest())
        }
        // if (isEmpty(userReducer?.data?.token || {}) && userReducer?.isGuest == false && userReducer.type == ActionTypes.LOGOUT) {
        //     navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'AuStackScreen' }]
        //     })
        // }
    }, [userReducer])

    return (
        <>
            <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={`${isUserToken ? "DrawScreen" : "AuStackScreen"}`}>
                {
                    isEmpty(userReducer?.data?.token || {}) && (
                        <>
                            <RootStack.Screen name="GuestStackScreen" component={GuestStackScreen} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="AuStackScreen" component={AuStackScreen} options={{ animationEnabled: true }} />
                        </>
                    )
                }
                {
                    !isEmpty(userReducer?.data?.token || {}) && (
                        <>
                            <RootStack.Screen name="DrawScreen" component={DrawScreen} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="AddLocation" component={AddLocation} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="ReliefPoint" component={ReliefPoints} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="Personal" component={Personal} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="ChangePasswordAuth" component={ChangePasswordAuth} options={{ animationEnabled: true }} />
                        </>
                    )
                }
            </RootStack.Navigator>
        </>
    );
}

export default RootStackScreen;