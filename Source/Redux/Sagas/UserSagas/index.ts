import { put, call } from 'redux-saga/effects';
import { apiSignin } from "../../../ApiFunction/Auth";
import { STATUS } from '../../../Constrants/url';
import httpServices from '../../../Services/httpServices';
import { userActions } from '../../Actions';
export function* login(body) {
    console.log("body", body)
    try {
        const response = yield call(apiSignin, body.body);

        if (STATUS.success.includes(response.status)) {
            httpServices.attachTokenToHeader(response.data.token)
            yield put(userActions.loginSuccess(response.data));
        } else {
            yield put(userActions.loginFailed(response.data));
        }
    } catch (error) {
        yield put(userActions.loginFailed(error));
    }
}