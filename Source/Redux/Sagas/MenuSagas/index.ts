import { call, put } from 'redux-saga/effects';
import { apiGetPermission } from "../../../ApiFunction/Auth";
import { STATUS } from '../../../Constrants/url';
import { MenuActions } from '../../Actions';

export function* getMenu() {
    try {
        const response = yield call(apiGetPermission);
        // console.log("responseMenu", response)
        if (STATUS.success.includes(response?.status)) {
            if (response?.data?.code == '200') {
                yield put(MenuActions.menuSuccess(response.data.lstObj));
            } else {
                yield put(MenuActions.MenuFailed(response?.data.message));
            }
        } else {
            yield put(MenuActions.MenuFailed(response?.data.message));
        }
    } catch (error) {
        yield put(MenuActions.MenuFailed(error));
    }
}
