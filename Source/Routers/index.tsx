
import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AddLocation, Home, Screen1, Signin } from '../Screens';
import auth from '@react-native-firebase/auth';
import { Store } from '..';
import httpServices from '../Services/httpServices';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Reducers';
import { isEmpty } from 'lodash';
import TabBar from '../Components/TabBar';
import Profile from '../Screens/Profile';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuStack = createStackNavigator();
const MainStack = createStackNavigator();
const TaskStack = createStackNavigator();
const RootStack = createStackNavigator();


const AuStackScreen = () => (
    <AuStack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false }}>
        <AuStack.Screen name="Signin" component={Signin} options={{ title: "Signin", animationEnabled: true }} />
    </AuStack.Navigator>
)

const MainStackScreen = () => (
    <MainStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={Home} options={{ title: "Home", animationEnabled: true }} />
        <MainStack.Screen name="Screen1" component={Screen1} options={{ title: "Screen1", animationEnabled: true }} />
        <MainStack.Screen name="AddLocation" component={AddLocation} options={{ title: "AddLocation", animationEnabled: true }} />
    </MainStack.Navigator>
)

const TaskScreen = () => (
    <TaskStack.Navigator initialRouteName="AddLocation" screenOptions={{ headerShown: false }} >
        <TaskStack.Screen name="Home" component={Home} options={{ title: "Home", animationEnabled: true }} />
        <TaskStack.Screen name="AddLocation" component={AddLocation} options={{ title: "AddLocation", animationEnabled: true }} />
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
        <Tabs.Screen name="Thêm địa điểm" component={TaskScreen} />
        <Tabs.Screen name="Cá nhân" component={ProfileStackScreen} />
    </Tabs.Navigator>
)

const DrawScreen = () => (
    <Drawer.Navigator initialRouteName="TabScreen" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="TabScreen" component={TabScreens} />
    </Drawer.Navigator>
)
const RootStackScreen = () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const isUserToken = !isEmpty(userReducer?.data || {})
    return (
        <>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {isUserToken ? (
                    <RootStack.Screen name="DrawScreen" component={DrawScreen} options={{ animationEnabled: true }} />
                ) : (
                    <RootStack.Screen name="AuStackScreen" component={AuStackScreen} options={{ animationEnabled: true }} />
                )}
            </RootStack.Navigator>
        </>
    );
}

export default RootStackScreen;