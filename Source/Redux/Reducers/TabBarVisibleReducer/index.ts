import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    status?: boolean;
    type: string;
}

const initialState: IUserReducer = {
    status: true,
    type: '',

};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_VISIBLE_TAB_BAR:
            return {
                ...state,
                type: action.type,
                status: action.status
            }
        default:
            return state
    }

}