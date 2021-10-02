import { combineReducers } from "redux";
import ProfileReducer from "./ProfileReducer";
import TabBarVisibleReducer from "./TabBarVisibleReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({ userReducer: UserReducer, tabBarVisibleReducer: TabBarVisibleReducer, profileReducer: ProfileReducer });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;