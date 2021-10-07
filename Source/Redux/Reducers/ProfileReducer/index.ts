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

    switch (action.type) {
        case ActionTypes.PROFILE_REQUEST:
            return {
                ...state,
                type: action.type,
                isLoading: action.isLoading
            }
        case ActionTypes.PROFILE_FAILED:
            return {
                ...state,
                type: action.type,
                errMessage: action.err,
                isLoading: action.isLoading,
            }
        case ActionTypes.PROFILE_SUCCESS:
            return {
                ...state,
                type: action.type,
                data: action.response,
                isLoading: action.isLoading,
            }
        default:
            return state
    }

}