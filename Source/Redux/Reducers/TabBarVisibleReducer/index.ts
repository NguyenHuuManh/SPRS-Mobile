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
    state.type = action.type;
    switch (action.type) {
        case ActionTypes.SET_VISIBLE_TAB_BAR:
            return {
                status: action.status
            }
        default:
            return state
    }

}