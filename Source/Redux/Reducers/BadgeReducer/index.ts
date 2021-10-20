import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    data: any,
}

const initialState: IUserReducer = {
    type: ActionTypes.BADGE_SHOW,
    data: {
        tab: "Thông báo",
        number: 3,
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BADGE_SHOW:
            return {
                ...state,
                type: action.type,
                data: action.payLoad
            }
        default:
            return state
    }
}