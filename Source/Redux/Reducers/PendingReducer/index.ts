import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    isPending: boolean,
}

const initialState: IUserReducer = {
    type: "",
    isPending: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.PENDING_LOGOUT:
            return {
                ...state,
                type: action.type,
                isPending: action.isPending
            }
        default:
            return state
    }
}