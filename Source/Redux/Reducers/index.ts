import { combineReducers } from "redux";
import BadgeReducer from "./BadgeReducer";
import MenuReducer from "./MenuReducer";
import NetworkCheckingReducer from "./NetworkCheckingReducer";
import PendingReducer from "./PendingReducer";
import ProfileReducer from "./ProfileReducer";
import TabBarVisibleReducer from "./TabBarVisibleReducer";
import ToastReducer from "./ToastReducer";
import UpdateAddressReducer from "./UpdateAddressReducer";
import UserReducer from "./UserReducer";
import NotificationReducer from "./NotificationReducer";
import ListenNotifiReducer from "./ListenNotifiReducer";
const rootReducer = combineReducers(
    {
        userReducer: UserReducer,
        tabBarVisibleReducer: TabBarVisibleReducer,
        profileReducer: ProfileReducer,
        toastReducer: ToastReducer,
        pendingReducer: PendingReducer,
        badgeReducer: BadgeReducer,
        networkCheckingReducer: NetworkCheckingReducer,
        updateAddressReducer: UpdateAddressReducer,
        menuReducer: MenuReducer,
        notificationReducer: NotificationReducer,
        listenNotifiReducer: ListenNotifiReducer
    });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;