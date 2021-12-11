import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    data?: any;
    type: string;
    isLoading: boolean;
}

const initialState: IUserReducer = {
    data: [],
    type: '',
    isLoading: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.MENU_REQUEST:
            return {
                data: [],
                type: action.type,
                isLoading: true,
            }
        case ActionTypes.MENU_FAILED:
            return {
                ...state,
                data: [],
                type: action.type,
                errMessage: action.error,
                isLoading: false,
            }
        case ActionTypes.MENU_SUCCESS:
            return {
                ...state,
                type: action.type,
                data: action.response,
                isLoading: false,
            }
        default:
            return state
    }

}