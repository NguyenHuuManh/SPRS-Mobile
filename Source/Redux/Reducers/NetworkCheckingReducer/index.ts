import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    isConnect: boolean,
}

const initialState: IUserReducer = {
    type: "",
    isConnect: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.NETWOTK_CHECKING:
            return {
                ...state,
                type: action.type,
                isConnect: action.isConnect
            }
        default:
            return state
    }
}