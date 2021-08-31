import { all, takeEvery } from "redux-saga/effects";
import ActionTypes from "../ActionTypes";
import * as userSagas from "./UserSagas";

export default function* watch() {
    yield all([takeEvery(ActionTypes.LOGIN_REQUEST, userSagas.login)])
}