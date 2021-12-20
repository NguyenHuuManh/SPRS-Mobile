import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    data: any,
}

const initialState: IUserReducer = {
    type: '',
    data: {
        status: false
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LISTENER_CHECKING:
            return {
                ...state,
                type: action.type,
                data: action.data
            }
        default:
            return state
    }
}