
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrawerCustom from '../Components/DrawerCustom';
import TabBar from '../Components/TabBar';
import { profileActions } from '../Redux/Actions';
import { RootState } from '../Redux/Reducers';
import { AddLocation, Home, Screen1, Signin } from '../Screens';
import ForgotPass from '../Screens/ForgotPass';
import ChangePassword from '../Screens/ForgotPass/ChangePassword';
import ComfirmOTP from '../Screens/ForgotPass/ComfirmOTP';
import LocationList from '../Screens/LocationList';
import Map from '../Screens/Map';
import Profile from '../Screens/Profile';
import Signup from '../Screens/Signup';


const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuStack = createStackNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TaskStack = createStackNavigator();
const RootStack = createStackNavigator();
const GuestStack = createStackNavigator();


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
        <MainStack.Screen name="Screen1" component={Screen1} options={{ title: "Screen1", animationEnabled: true }} />
        <MainStack.Screen name="AddLocation" component={AddLocation} options={{ title: "AddLocation", animationEnabled: true }} />
    </MainStack.Navigator>
)

const LocationListScreen = () => (
    <TaskStack.Navigator initialRouteName="LocationList" screenOptions={{ headerShown: false, gestureEnabled: false }} >
        <TaskStack.Screen name="LocationList" component={LocationList} options={{ title: "LocationList", animationEnabled: true }} />
    </TaskStack.Navigator>
)

const ProfileStackScreen = () => (
    <MainStack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Profile" component={Profile} options={{ title: "Profile", animationEnabled: true }} />
    </MainStack.Navigator>
)

const TabScreens = () => (
    <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => { return <TabBar {...props} /> }}>
        <Tabs.Screen name="Trang chủ" component={MainStackScreen} />
        <Tabs.Screen name="Bản đồ" component={(Map)} />
        <Tabs.Screen name="Danh sách điểm" component={LocationListScreen} />
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
    console.log("isUserToken", isUserToken)
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (isUserToken) {
    //         dispatch(profileActions.profileRequest())
    //     }
    // }, [userReducer])

    return (
        <>
            <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={`${isUserToken ? "DrawScreen" : "AuStackScreen"}`}>
                {
                    !isUserToken && (
                        <>
                            <RootStack.Screen name="GuestStackScreen" component={GuestStackScreen} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="AuStackScreen" component={AuStackScreen} options={{ animationEnabled: true }} />

                        </>
                    )
                }
                {
                    isUserToken && (
                        <>
                            <RootStack.Screen name="DrawScreen" component={DrawScreen} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="AddLocation" component={AddLocation} options={{ animationEnabled: true }} />
                        </>
                    )
                }
            </RootStack.Navigator>
        </>
    );
}

export default RootStackScreen;