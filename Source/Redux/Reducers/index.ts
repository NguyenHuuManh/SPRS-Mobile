import { combineReducers } from "redux";
import BadgeReducer from "./BadgeReducer";
import NetworkCheckingReducer from "./NetworkCheckingReducer";
import PendingReducer from "./PendingReducer";
import ProfileReducer from "./ProfileReducer";
import TabBarVisibleReducer from "./TabBarVisibleReducer";
import ToastReducer from "./ToastReducer";
import UserReducer from "./UserReducer";
import ForcusNotificationReducer from "./ForcusNotificationReducer";
import UpdateAddressReducer from "./UpdateAddressReducer";
import MenuReducer from "./MenuReducer";

const rootReducer = combineReducers(
    {
        userReducer: UserReducer,
        tabBarVisibleReducer: TabBarVisibleReducer,
        profileReducer: ProfileReducer,
        toastReducer: ToastReducer,
        pendingReducer: PendingReducer,
        badgeReducer: BadgeReducer,
        networkCheckingReducer: NetworkCheckingReducer,
        forcusNotificationReducer: ForcusNotificationReducer,
        updateAddressReducer: UpdateAddressReducer,
        menuReducer: MenuReducer
    });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;