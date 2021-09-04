import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    data?: {};
    type: string;
    isLoading: boolean;
}

const initialState: IUserReducer = {
    data: {},
    type: '',
    isLoading: false,

};
export default (state = initialState, action) => {
    state.type = action.type;
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                isLoading: action.isLoading
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                errMessage: action.err,
                isLoading: action.isLoading,
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                data: action.response,
                isLoading: action.isLoading,
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