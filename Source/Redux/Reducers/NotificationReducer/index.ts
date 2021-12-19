import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: any,
    data: any,
    loading: boolean,
    isRefesh: boolean,
    pageSize: number,
    pageIndex: number,
}

const initialState: IUserReducer = {
    type: '',
    data: {},
    loading: false,
    isRefesh: false,
    pageSize: 10,
    pageIndex: 1,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.NOTIFICATION_SUCCESS:
            return {
                ...state,
                type: action.type,
                data: action.data,
                loading: false,
                isRefesh: false,

            }
        case ActionTypes.NOTIFICATION_REQUEST:
            return {
                ...state,
                type: action.type,
                loading: true,
                isRefesh: action.isRefesh,
                pageSize: action.pageSize,
                pageIndex: action.pageIndex
            }

        case ActionTypes.NOTIFICATION_FAILED:
            return {
                ...state,
                type: action.type,
                err: action.data,
                loading: false,
                isRefesh: false,
                pageSize: 10,
                pageIndex: 1
            }
        default:
            return state
    }
}