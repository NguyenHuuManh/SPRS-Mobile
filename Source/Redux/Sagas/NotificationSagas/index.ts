import { call, put } from 'redux-saga/effects';
import { apiGetAllNotification } from '../../../ApiFunction/Notification';
import { NotificationActions } from '../../Actions';
export function* notificationSaga(payload) {
    const { pageIndex, pageSize } = payload;
    const response = yield call(apiGetAllNotification, { pageSize: pageSize, pageIndex: pageIndex });
    console.log('reponseNotification', response);
    if (response?.status == 200) {
        if (response.data.code == '200') {
            yield put(NotificationActions.notificationSuccess(response.data.obj));
            return;
        }
        yield put(NotificationActions.notificationFailed(response.data.description));
        return;
    }
    yield put(NotificationActions.notificationFailed(response?.message));
}