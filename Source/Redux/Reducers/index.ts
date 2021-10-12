import { combineReducers } from "redux";
import BadgeReducer from "./BadgeReducer";
import PendingReducer from "./PendingReducer";
import ProfileReducer from "./ProfileReducer";
import TabBarVisibleReducer from "./TabBarVisibleReducer";
import ToastReducer from "./ToastReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers(
    {
        userReducer: UserReducer,
        tabBarVisibleReducer: TabBarVisibleReducer,
        profileReducer: ProfileReducer,
        toastReducer: ToastReducer,
        pendingReducer: PendingReducer,
        badgeReducer: BadgeReducer,
    });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;