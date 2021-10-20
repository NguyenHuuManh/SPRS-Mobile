import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    type: string,
    payload: {
        type?: "success" | "error";
        message?: string;
        position?: "top" | "bottom";
        isShow?: boolean;
    }
}

const initialState: IUserReducer = {
    type: "",
    payload: {
        type: "success",
        message: "",
        position: "top",
        isShow: false
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.TOAST_SHOW:
            return {
                ...state,
                type: action.type,
                payload: action.payload
            }
        default:
            return state
    }
}