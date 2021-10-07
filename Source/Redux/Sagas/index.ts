import { all, takeEvery, takeLatest } from "redux-saga/effects";
import ActionTypes from "../ActionTypes";
import * as userSagas from "./UserSagas";
import * as profileSagas from "./ProfileSagas";
import { onChangePending } from "./PendingSagas";

export default function* watch() {
    yield all([
        takeEvery(ActionTypes.LOGIN_REQUEST, userSagas.login),
        takeLatest(ActionTypes.PROFILE_REQUEST, profileSagas.getProfile),
        takeLatest(ActionTypes.LOGOUT, onChangePending)
    ])
}