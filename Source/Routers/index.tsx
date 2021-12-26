
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DrawerCustom from '../Components/DrawerCustom';
import TabBar from '../Components/TabBar';
import { badgeShowActions, MenuActions, profileActions } from '../Redux/Actions';
import ActionTypes from '../Redux/ActionTypes';
import { RootState } from '../Redux/Reducers';
import { Home, Signin } from '../Screens';
import AddReliefPoint from '../Screens/AddReliefPoint';
import AddStorePoint from '../Screens/AddStorePoint';
import ChangePasswordAuth from '../Screens/ChangePasswordAuth';
import DetailPoint from '../Screens/DetailPoint';
import ForgotPass from '../Screens/ForgotPass';
import ChangePassword from '../Screens/ForgotPass/ChangePassword';
import ComfirmOTP from '../Screens/ForgotPass/ComfirmOTP';
import MapCluser from '../Screens/MapCluser';
import MapCluserSupper from '../Screens/MapCluserSupper';
import Notification from '../Screens/Notification';
import NotificationDetail from '../Screens/NotificationDetail';
import OrgPoints from '../Screens/OrgPoints';
import Profile from '../Screens/Profile';
import Personal from '../Screens/Profile/Personal';
import ReliefPoints from '../Screens/ReliefPoints';
import Signup from '../Screens/Signup';
import SOS from '../Screens/SOS';
import StorePoints from '../Screens/StorePoints';
import SubcribleList from '../Screens/SubcribleList';
import UpdateEventPoint from '../Screens/UpdateEventPoint';
import UpdateReliefPoint from '../Screens/UpdateReliefPoint';
import UpdateStorePoint from '../Screens/UpdateStorePoint';
import { getCurrentLocation, notificationListener } from '../Services/notificationService';

// import { getCurrentRoute, reset } from '/';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const GuestStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
// .initialRouteReducer;

const GuestStackScreen = () => (
    <GuestStack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
        <GuestStack.Screen name="Map" component={MapCluserSupper} options={{ title: "Map", animationEnabled: true }} />
        <GuestStack.Screen name="DetailPoint" component={DetailPoint} options={{ title: "DetailPoint", animationEnabled: true }} />
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
    <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => { return <TabBar {...props} /> }} initialRouteName="Trang chủ">
        <Tabs.Screen name="Trang chủ" component={MainStackScreen} />
        <Tabs.Screen name="Bản đồ" component={MapCluser} />
        <Tabs.Screen name="Thông báo" component={NotificationStackScreen} />
        <Tabs.Screen name="Cá nhân" component={ProfileStackScreen} />
    </Tabs.Navigator>
)

const DrawScreen = () => (
    <Drawer.Navigator initialRouteName={"TabScreen"} screenOptions={{ headerShown: false, swipeEnabled: false, gestureEnabled: false }} drawerContent={(props) => <DrawerCustom {...props} />}>
        <Drawer.Screen name="TabScreen" component={TabScreens} />
    </Drawer.Navigator>
)
const RootStackScreen = () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const profileReducer = useSelector((state: RootState) => state.profileReducer);
    const isUserToken = !isEmpty(userReducer?.data?.token || {})
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const callBack = (e) => {
        console.log(e, 'eeeee');
    }

    React.useEffect(() => {
        notificationListener();
        AppState.addEventListener('change', callBack);
        return AppState.removeEventListener('change', callBack);
    }, [])

    useEffect(() => {
        if (userReducer?.data?.token) {
            dispatch(profileActions.profileRequest());
            dispatch(badgeShowActions.badgeRequest());
            getCurrentLocation();
            dispatch(MenuActions.MenuRequest());
        }
        // console.log('!userReducer?.data?.token', !userReducer?.data?.token);
        // console.log('userReducer?.isGuest == false', userReducer?.isGuest == false);
        // console.log('userReducer.type == ActionTypes.LOGOUT', userReducer.type == ActionTypes.LOGOUT);

        if (!userReducer?.data?.token && userReducer?.isGuest == false && userReducer.type == ActionTypes.LOGOUT) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'AuStackScreen' }]
            })
        }
    }, [userReducer]);

    return (
        <>
            <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={`${isUserToken ? "MapCluser" : "AuStackScreen"}`}>
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
                            <RootStack.Screen name="MapCluser" component={MapCluserSupper} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="AddReliefPoint" component={AddReliefPoint} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="NotificationDetail" component={NotificationDetail} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="AddStorePoint" component={AddStorePoint} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="UpdateReliefPoint" component={UpdateReliefPoint} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="UpdateEventPoint" component={UpdateEventPoint} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="ReliefPoint" component={ReliefPoints} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="StorePoints" component={StorePoints} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="OrgPoints" component={OrgPoints} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="SOS" component={SOS} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="SubcribeList" component={SubcribleList} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="DetailPoint" component={DetailPoint} options={{ animationEnabled: true }} />
                            <RootStack.Screen name="UpdateStorePoint" component={UpdateStorePoint} options={{ animationEnabled: true }} />
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