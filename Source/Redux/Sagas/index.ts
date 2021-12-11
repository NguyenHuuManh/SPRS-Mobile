import { all, takeLatest } from "redux-saga/effects";
import ActionTypes from "../ActionTypes";
import { badgeSaga } from "./BadgeSagas";
import { getMenu } from "./MenuSagas";
import { onNetworkChecking } from "./NetworkCheckingSagas";
import { onChangePending } from "./PendingSagas";
import * as profileSagas from "./ProfileSagas";
import { requestUpdate } from "./UpdateAddressSagas";
import * as userSagas from "./UserSagas";

export default function* watch() {
    yield all([
        takeLatest(ActionTypes.LOGIN_REQUEST, userSagas.login),
        takeLatest(ActionTypes.PROFILE_REQUEST, profileSagas.getProfile),
        takeLatest(ActionTypes.LOGOUT, onChangePending),
        takeLatest(ActionTypes.NETWOTK_CHECKING, onNetworkChecking),
        takeLatest(ActionTypes.BADGE_REQUEST, badgeSaga),
        takeLatest(ActionTypes.UPDATE_ADDRESS_DEVICE_REQUEST, requestUpdate),
        takeLatest(ActionTypes.MENU_REQUEST, getMenu),
    ])
}