import ActionTypes from "../../ActionTypes"

export const MenuRequest = () => {
    return {
        type: ActionTypes.MENU_REQUEST,
        isLoading: true
    }
}

export const MenuFailed = (err) => {
    return {
        type: ActionTypes.MENU_FAILED,
        error: err,
        isLoading: false
    }
}

export const menuSuccess = (response) => {
    return {
        type: ActionTypes.MENU_SUCCESS,
        response: response,
        isLoading: false
    }
}