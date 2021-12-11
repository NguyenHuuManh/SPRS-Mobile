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

const callCreateDevice = async () => {
    try {
        return await getFcmToken().finally(async () => {
            let fcmToken = await AsyncStorage.getItem('fcmToken');
            try {
                return await apiCreateDevice({
                    token: fcmToken,
                    serial: DeviceInfo.getUniqueId(),
                    address: null
                })
                    .then((e) => {
                        console.log("eeeeee", e);
                        if (e?.status == 200 && e?.data?.code == '200') return;
                        Toast.show({
                            type: "error",
                            text1: 'Chức năng thông báo đang được bảo trì',
                            position: "top"
                        })
                        return e;
                    })
            } catch (error) {
                console.log(error, 'Create device failed')
            }
        })
    } catch (error) {
        console.log(error, 'getTokenFailed');
    }
}

export function* login(body) {
    try {
        const response = yield call(apiSignin, body.body);
        console.log("responseLogin", response)
        if (STATUS.success.includes(response?.status)) {
            if (response?.data?.token) {
                httpServices.attachTokenToHeader(response?.data?.token);
                AsyncStorage.removeItem("AddressId");
                try {
                    const reponseCreate = yield call(callCreateDevice);
                    if (reponseCreate || !reponseCreate) {
                        yield put(userActions.loginSuccess(response?.data));
                    }
                } catch (error) {
                    yield put(userActions.loginFailed('createDeviceFailed'));
                }

            } else {
                Toast.show({
                    type: "error",
                    text1: response.data.message,
                    position: "top"
                })
                yield put(userActions.loginFailed(response?.data.message));
            }
        } else {
            if (response.status == 401) {
                Toast.show({
                    type: "error",
                    text1: response.data.message,
                    position: "top"
                })
            } else {
                Toast.show({
                    type: "error",
                    text1: "Hệ thống đang bảo trì",
                    position: "top"
                })
            }
            yield put(userActions.loginFailed(response?.data.message));
        }
    } catch (error) {
        yield put(userActions.loginFailed(error));
    }
}
