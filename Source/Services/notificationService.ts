import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import NetInfo from "@react-native-community/netinfo";
import { store } from '../Store';
import { netWorkChecking } from '../Redux/Actions/NetworkActions';
import Toast from 'react-native-toast-message';
import { badgeRequest } from '../Redux/Actions/BadgeShowActions';
import { useNavigation } from "@react-navigation/core";
import { initialRoute } from '../Redux/Actions/InitialRouteActions';
import { navigate, navigationRef } from '../Helper/RootNavigation';
import { useLinkTo } from '@react-navigation/native';
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
                    remoteMessage.notification,
                );
                // callBack(remoteMessage);
                const item = {
                    create_time: null,
                    id: 293,
                    message: "Có một địa điểm cứu trợ được tạo gần bạn",
                    sender: {
                        close_time: "21-10-2021 12:14",
                        create_by: null,
                        create_time: "2021-11-23 09:11:28",
                        description: "",
                        id: 289,
                        modified_by: null,
                        modified_date: null,
                        name: "test notification21",
                        open_time: "20-10-2021 10:14",
                        status: true,
                        user_rp: null
                    },
                    status: "read",
                    type: "rp",
                }
                navigate("NotificationDetail", { item, isBack: true });
            }
        });

    messaging().onNotificationOpenedApp(async message => {
        console.log("messageeee", message);
        // store.dispatch(notificationRoute({ id: 10 }));
    })
}

export const networkListener = async () => {
    // Subscribe
    NetInfo.addEventListener(state => {
        store.dispatch(netWorkChecking(state.isConnected));
    });
}