import Toast from 'react-native-toast-message';
import { put, call } from 'redux-saga/effects';
import { apiSignin } from "../../../ApiFunction/Auth";
import { STATUS } from '../../../Constrants/url';
import httpServices from '../../../Services/httpServices';
import { userActions } from '../../Actions';
export function* login(body) {
    try {
        const response = yield call(apiSignin, body.body);
        console.log("responseLogin", response)
        if (STATUS.success.includes(response?.status)) {
            httpServices.attachTokenToHeader(response.data.token)
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

