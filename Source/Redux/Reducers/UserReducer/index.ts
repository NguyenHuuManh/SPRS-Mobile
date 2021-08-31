import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    data?: {};
    type: string;
}

const initialState: IUserReducer = {
    data: {},
    type: '',
};
export default (state = initialState, action) => {
    state.type = action.type;
    switch (action.type) {
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                errMessage: action.err
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                data: action.response
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                data: {}
            }
        default:
            return state
    }

}