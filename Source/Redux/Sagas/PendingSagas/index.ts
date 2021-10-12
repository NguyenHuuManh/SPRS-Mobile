import { put } from 'redux-saga/effects';
import httpServices from '../../../Services/httpServices';
import { pendingActions } from '../../Actions';
export function* onChangePending() {
    httpServices.attachTokenToHeader();
    yield put(pendingActions.pendingLogout(false));
}