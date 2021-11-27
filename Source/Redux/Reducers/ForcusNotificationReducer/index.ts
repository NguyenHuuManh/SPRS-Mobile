import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    status: boolean,
}

const initialState: IUserReducer = {
    type: ActionTypes.FORCUS_NOTIFICATION_TAB,
    status: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FORCUS_NOTIFICATION_TAB:
            return {
                ...state,
                type: action.type,
                status: action.payload
            }
        default:
            return state
    }
}