import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    data: any,
}

const initialState: IUserReducer = {
    type: ActionTypes.BADGE_RESULTS,
    data: {
        tab: "Thông báo",
        number: 0,
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BADGE_REQUEST:
            return {
                ...state,
                type: action.type,
            }
        case ActionTypes.BADGE_RESULTS:
            return {
                ...state,
                type: action.type,
                data: {
                    tab: "Thông báo",
                    number: action.payload
                }
            }

        case ActionTypes.BADGE_FAILED:
            return {
                ...state,
                type: action.type,
                err: action.payload
            }
        default:
            return state
    }
}