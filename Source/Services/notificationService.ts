import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import NetInfo from "@react-native-community/netinfo";
import { store } from '../Store';
import { netWorkChecking } from '../Redux/Actions/NetworkActions';
export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging().onMessage(async remoteMessage => {
        console.log('recieved', remoteMessage);
    })

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}

export const networkListener = async () => {
    // Subscribe
    NetInfo.addEventListener(state => {
        store.dispatch(netWorkChecking(state.isConnected));
    });
}