import Geolocation from 'react-native-geolocation-service';
import { put } from 'redux-saga/effects';
import { apiUpdateAddressDivice } from '../../../ApiFunction/Notification';
import { apiPlaceDetailByLongLat } from '../../../ApiFunction/PlaceAPI';
import { UpdateAddressDeviceActions } from '../../Actions';

export function* requestUpdate(payload) {
    try {
        Geolocation.getCurrentPosition(
            (response) => {
                const coords = response.coords
                apiPlaceDetailByLongLat(coords.longitude, coords.latitude).then((responsePlace) => {
                    if (responsePlace.status == 200) {
                        const place = responsePlace?.data?.results[0]?.address_components;
                        const body = {
                            id: payload.payload,
                            city: {
                                name: place[place?.length - 1]?.long_name,
                                id: "",
                                code: "",
                            },
                            district: {
                                name: place[place?.length - 2]?.long_name,
                                id: "",
                                code: "",
                            },
                            subDistrict: {
                                name: place[place?.length - 3]?.long_name,
                                id: "",
                                code: "",
                            },
                            addressLine: "",
                            addressLine2: "",
                            GPS_Lati: coords.latitude + "",
                            GPS_long: coords.longitude + "",
                            gps_lati: coords.latitude + "",
                            gps_long: coords.longitude + "",
                        }

                        apiUpdateAddressDivice(body).then((e) => {
                            console.log("updateDevice", e);
                            if (e.data == 200) {
                                if (e.data.code == '200') {
                                    put(UpdateAddressDeviceActions.updateSuccess(e?.data.obj));
                                } else {
                                    put(UpdateAddressDeviceActions.updateFailed(e?.data.message));
                                }
                            } else {
                                put(UpdateAddressDeviceActions.updateFailed(e?.data?.message));
                            }
                        })
                    }
                });
            },
            (error) => { console.log("errorCurrentLocation", error) },
            {
                distanceFilter: 1000,
                enableHighAccuracy: true
            }
        )
    } catch (error) {
        yield put(UpdateAddressDeviceActions.updateFailed(error));
    }
}