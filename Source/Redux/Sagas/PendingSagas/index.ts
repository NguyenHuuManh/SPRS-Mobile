import { isEmpty } from 'lodash';
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';
import { call, put } from 'redux-saga/effects';
import { apiDeleteDevice } from '../../../ApiFunction/Notification';
import httpServices from '../../../Services/httpServices';
import { pendingActions } from '../../Actions';
import { RootState } from '../../Reducers';
export function* onChangePending(payload) {
    const { data } = payload;
    console.log('payload', payload);
    console.log(data, "userReducer?.data?.token");
    console.log(data.isexpired, 'isexpired');
    if (data.isexpired) {
        yield put(pendingActions.pendingLogout(false));
        return;
    };
    const response = yield call(apiDeleteDevice, { serialNumber: DeviceInfo.getUniqueId() });
    console.log(response, 'reponse delete device');
    if (response.status == 200) {
        if (response.data.code == '200') {
            httpServices.attachTokenToHeader();
            yield put(pendingActions.pendingLogout(false));
            return;
        }
        Alert.alert('Logout Faild');
        return;
    }
    Alert.alert('Logout Faild');
    return;
}