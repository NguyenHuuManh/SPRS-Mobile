import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { call, put } from 'redux-saga/effects';
import { apiSignin } from "../../../ApiFunction/Auth";
import { apiCreateDevice } from '../../../ApiFunction/Notification';
import { STATUS } from '../../../Constrants/url';
import httpServices from '../../../Services/httpServices';
import { getFcmToken } from '../../../Services/notificationService';
import { userActions } from '../../Actions';
export function* login(body) {
    try {
        console.log("body", body);
        const response = yield call(apiSignin, body.body);
        console.log("responseLogin", response)
        if (STATUS.success.includes(response?.status)) {
            if (response?.data?.token) {
                httpServices.attachTokenToHeader(response?.data?.token);
                yield put(userActions.loginSuccess(response?.data));
                AsyncStorage.removeItem("AddressId");
                getFcmToken().finally(async () => {
                    let fcmToken = await AsyncStorage.getItem('fcmToken');
                    apiCreateDevice({
                        token: fcmToken,
                        serial: DeviceInfo.getUniqueId(),
                        address: null
                    }).then((e) => {
                        console.log("eeeeee", e);
                    })

                });

            } else {
                Toast.show({
                    type: "error",
                    text1: response.data.message,
                    position: "top"
                })
                yield put(userActions.loginFailed(response?.data.message));
            }
        } else {
            Toast.show({
                type: "error",
                text1: "Hệ thống đang bảo trì",
                position: "top"
            })
            yield put(userActions.loginFailed(response?.data));
        }
    } catch (error) {
        yield put(userActions.loginFailed(error));
    }
}
