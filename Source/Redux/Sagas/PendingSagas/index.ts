import { put } from 'redux-saga/effects';
import { apiDeleteDevice } from '../../../ApiFunction/Notification';
import httpServices from '../../../Services/httpServices';
import DeviceInfo from 'react-native-device-info';
import { pendingActions, userActions } from '../../Actions';
export function* onChangePending() {
    DeviceInfo.getUniqueId(),
        apiDeleteDevice().then((e) => {
            console.log("removeDevice", e)
        }).finally(() => {
            httpServices.attachTokenToHeader();
        })
    yield put(pendingActions.pendingLogout(false));
}