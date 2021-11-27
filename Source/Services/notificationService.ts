import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { apiUpdateStatusNotification } from '../ApiFunction/Notification';
import { navigate } from '../Helper/RootNavigation';
import { badgeShowActions } from '../Redux/Actions';
import { badgeRequest } from '../Redux/Actions/BadgeShowActions';
import { netWorkChecking } from '../Redux/Actions/NetworkActions';
import { store } from '../Store';
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

export const notificationListener = async (callBack?: any) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging().onMessage(async remoteMessage => {
        Toast.show({
            type: "success",
            text2: remoteMessage.notification.body,
            text1: remoteMessage.notification.title,
            position: "top"
        });
        store.dispatch(badgeRequest());

    })

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage,
                );
                // callBack(remoteMessage);
                const item = remoteMessage.data;

                if (['rp', 'st', 'sos', 'org'].includes(item.type)) {
                    apiUpdateStatusNotification({ id: item.id, status: "read" }).then((e) => {
                        if (e.status == 200) {
                            if (e.data.code == '200') {
                                store.dispatch(badgeShowActions.badgeRequest());
                            }
                        } else {
                            console.log("err");
                        }
                    });
                    navigate("DetailPoint", { point: { id: item.sender, type: item.type }, from: 'MapCluser' });
                } else {
                    navigate('NotificationDetail', { item, isBack: true });
                }
            }
        });

}

export const networkListener = async () => {
    // Subscribe
    NetInfo.addEventListener(state => {
        store.dispatch(netWorkChecking(state.isConnected));
    });
}