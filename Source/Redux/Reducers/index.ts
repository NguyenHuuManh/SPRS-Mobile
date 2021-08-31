import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({ userReducer: UserReducer });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;