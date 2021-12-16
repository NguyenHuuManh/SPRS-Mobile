import { call, put } from 'redux-saga/effects';
import { apiGetUncheckNotification } from '../../../ApiFunction/Notification';
import { badgeShowActions } from '../../Actions';
export function* badgeSaga() {
    const response = yield call(apiGetUncheckNotification);
    if (response?.status == 200) {
        if (response.data.code == '200') {
            yield put(badgeShowActions.badgeResults(response.data.obj.quantity));
            return;
        }
        yield put(badgeShowActions.badgeFailed(response?.data?.message));
        return;
    }
    yield put(badgeShowActions.badgeFailed(response?.message));


}