import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNull } from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { put, call } from 'redux-saga/effects';
import { apiUpdateAddressDivice } from '../../../ApiFunction/Notification';
import { UpdateAddressDeviceActions } from '../../Actions';


export function* requestUpdate(param) {
    const { payload } = param
    try {
        const responseUpdate = yield call(apiUpdateAddressDivice, payload, DeviceInfo.getUniqueId());
        // console.log(responseUpdate, "responseUpdate");
        if (responseUpdate.status == 200) {
            if (responseUpdate.data.code == '200') {
                yield put(UpdateAddressDeviceActions.updateSuccess(responseUpdate?.data.obj.address));
                if (isNull(payload.id)) {
                    // console.log(responseUpdate?.data.obj.address.id, "e?.data.obj.address.id")
                    AsyncStorage.setItem("AddressId", JSON.stringify(responseUpdate.data.obj.address.id));
                }
            } else {
                yield put(UpdateAddressDeviceActions.updateFailed(responseUpdate?.data.message));
            }
        } else {
            yield put(UpdateAddressDeviceActions.updateFailed(responseUpdate?.message));
        }
    } catch (error) {
        yield put(UpdateAddressDeviceActions.updateFailed(error));
    }
}