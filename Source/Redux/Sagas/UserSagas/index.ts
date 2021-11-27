import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';
import { call, put } from 'redux-saga/effects';
import { apiSignin } from "../../../ApiFunction/Auth";
import { STATUS } from '../../../Constrants/url';
import httpServices from '../../../Services/httpServices';
import { getFcmToken } from '../../../Services/notificationService';
import { userActions } from '../../Actions';
import { apiCreateDevice } from '../../../ApiFunction/Notification';
import DeviceInfo from 'react-native-device-info';
import { apiPlaceDetailByLongLat } from '../../../ApiFunction/PlaceAPI';
export function* login(body) {
    try {
        const response = yield call(apiSignin, body.body);
        if (STATUS.success.includes(response?.status)) {

            httpServices.attachTokenToHeader(response.data.token);
            getFcmToken().finally(async () => {
                let fcmToken = await AsyncStorage.getItem('fcmToken');
                apiCreateDevice({
                    token: fcmToken,
                    serial: DeviceInfo.getUniqueId(),
                    address: {
                        city: {
                            code: "",
                            id: "",
                            name: ""
                        },
                        district: {
                            code: "",
                            id: "",
                            name: ""
                        },
                        subDistrict: {
                            code: "",
                            id: "",
                            name: ""
                        },
                        addressLine: "",
                        GPS_long: "",
                        GPS_lati: "",
                    },
                }).then((e) => {
                    console.log("eeeeee", e);
                })

            });

            yield put(userActions.loginSuccess(response?.data));
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

