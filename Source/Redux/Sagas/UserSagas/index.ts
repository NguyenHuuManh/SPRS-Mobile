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
                Geolocation.getCurrentPosition(
                    (response) => {

                        apiPlaceDetailByLongLat(response.coords.longitude, response.coords.latitude).then((responseDetail) => {
                            if (responseDetail.status == 200) {
                                const place = responseDetail?.data?.results[0]?.address_components;
                                apiCreateDevice({
                                    token: fcmToken,
                                    serial: DeviceInfo.getUniqueId(),
                                    address: {
                                        city: {
                                            code: "",
                                            id: "",
                                            name: place[place?.length - 1]?.long_name || ""
                                        },
                                        district: {
                                            code: "",
                                            id: "",
                                            name: place[place?.length - 2]?.long_name || ""
                                        },
                                        subDistrict: {
                                            code: "",
                                            id: "",
                                            name: place[place?.length - 3]?.long_name || ""
                                        },
                                        addressLine: "",
                                        GPS_long: response.coords.longitude,
                                        GPS_lati: response.coords.latitude,
                                        gps_lati: response.coords.latitude,
                                        gps_long: response.coords.longitude,
                                    },
                                }).then((e) => {
                                    console.log("eeeeee", e);
                                })
                            }
                        });

                    },
                    (error) => {
                        if (error.code == 5) {
                            alert("Yêu cầu quyền truy cập vị trí của bạn để sử dụng chức năng này")
                            return;
                        }
                        return {}
                    },
                    {
                        distanceFilter: 10,
                        enableHighAccuracy: true,
                        accuracy: { android: "high" },
                    }
                )

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

