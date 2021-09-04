import ActionTypes from "../../ActionTypes"

export const loginReques = (body) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        body: body,
        isLoading: true
    }
}

export const loginFailed = (err) => {
    return {
        type: ActionTypes.LOGIN_FAILED,
        error: err,
        isLoading: false
    }
}

export const loginSuccess = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        response: response,
        isLoading: false
    }
}

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}