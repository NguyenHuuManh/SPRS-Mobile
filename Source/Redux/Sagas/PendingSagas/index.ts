import { isEmpty } from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';
import { put } from 'redux-saga/effects';
import { apiDeleteDevice } from '../../../ApiFunction/Notification';
import httpServices from '../../../Services/httpServices';
import { pendingActions } from '../../Actions';
import { RootState } from '../../Reducers';
export function* onChangePending(payload) {
    const { data } = payload;
    console.log(data, "userReducer?.data?.token");
    if (!isEmpty(data?.data?.token || {})) {
        apiDeleteDevice({ serialNumber: DeviceInfo.getUniqueId() }).then((e) => {
            console.log("removeDevice", e)
        }).finally(() => {
            httpServices.attachTokenToHeader();
        })
    }

    yield put(pendingActions.pendingLogout(false));

}