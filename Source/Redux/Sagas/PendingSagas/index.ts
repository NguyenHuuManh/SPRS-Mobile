import { put } from 'redux-saga/effects';
import { apiDeleteDevice } from '../../../ApiFunction/Notification';
import httpServices from '../../../Services/httpServices';
import { pendingActions, userActions } from '../../Actions';
export function* onChangePending() {
    apiDeleteDevice().then((e) => {
        console.log("removeDevice", e)
    }).finally(() => {
        httpServices.attachTokenToHeader();
    })
    yield put(pendingActions.pendingLogout(false));
}