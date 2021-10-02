import ActionTypes from "../../ActionTypes"

export const loginReques = (status) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        status: status
    }
}