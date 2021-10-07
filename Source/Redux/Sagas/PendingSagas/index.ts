import { call, put } from 'redux-saga/effects';
import { apiGetProfile } from "../../../ApiFunction/Auth";
import { STATUS } from '../../../Constrants/url';
import httpServices from '../../../Services/httpServices';
import { pendingActions, profileActions, userActions } from '../../Actions';
export function* onChangePending() {
    yield put(pendingActions.pendingLogout(false));
}