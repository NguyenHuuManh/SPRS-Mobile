import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Store } from "../..";
import { useNavigation } from "@react-navigation/native";
import { apiSaveTokenDevice, apiSenAll } from "../../ApiFunction/Location";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/UserActions";
export default () => {
    const navigation = useNavigation()
    const [message, setMessage] = useState<any>("None");
    const { user: { setUser, user } } = useContext(Store)
    const dispatch = useDispatch()

    const configNotification = () => {
        const unsubscribe = messaging().onMessage(remoteMessage => {
            console.log(remoteMessage, "message");
            setMessage(remoteMessage.notification.body);
        });

        return unsubscribe;
    }
    useEffect(() => {
        messaging().getToken()
            .then((e) => {
                saveTokenDevice(e)
            })
            .finally(() => {
                configNotification();
            })
    }, [])
    const signout = () => {
        dispatch(logout());
    }

    const saveTokenDevice = (token: String) => {
        apiSaveTokenDevice({
            deciceIsEnable: "true",
            deviceType: {

            },
            user: {
                id: "1"
            },
            tokenDevice: {
                token: `${token}`
            },
            locationDevice: {
                longitude: " 122313.1",
                latitude: "123242.1",
                city: "Ha Noi",
                province: "",
                district: "Thach That",
                sub_district: " Ha Bang"
            }
        })
            .then((e) => { console.log(e, "responseSaveToken") })
    }

    const sendMessage = () => {
        apiSenAll({ target: "hello", title: "abv", body: "abcxyz" })
            .then((e) => { console.log(e, "responseSendMessage") })
    }

    return (
        <View>
            <View style={{ width: 300, padding: 20 }}>
                <Text>{message}</Text>
            </View>
            <Button title={"Logout"} onPress={signout}></Button>
        </View>
    );

}