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
        case ActionTypes.UPDATE_ADDRESS_DEVICE_REQUEST:
            return {
                ...state,
                type: action.type,
                isLoading: action.isLoading,
                data: action.payload
            }
        case ActionTypes.UPDATE_ADDRESS_DEVICE_FAILED:
            return {
                ...state,
                type: action.type,
                errMessage: action.err,
                isLoading: action.isLoading,
            }
        case ActionTypes.UPDATE_ADDRESS_DEVICE_SUCCESS:
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