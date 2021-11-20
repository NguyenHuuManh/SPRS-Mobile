import { all, takeEvery, takeLatest } from "redux-saga/effects";
import ActionTypes from "../ActionTypes";
import * as userSagas from "./UserSagas";
import * as profileSagas from "./ProfileSagas";
import { onChangePending } from "./PendingSagas";
import { onNetworkChecking } from "./NetworkCheckingSagas";

export default function* watch() {
    yield all([
        takeLatest(ActionTypes.LOGIN_REQUEST, userSagas.login),
        takeLatest(ActionTypes.PROFILE_REQUEST, profileSagas.getProfile),
        takeLatest(ActionTypes.LOGOUT, onChangePending),
        takeLatest(ActionTypes.NETWOTK_CHECKING, onNetworkChecking)
    ])
}