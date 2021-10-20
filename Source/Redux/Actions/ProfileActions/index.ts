import ActionTypes from "../../ActionTypes"

export const profileRequest = () => {
    return {
        type: ActionTypes.PROFILE_REQUEST,
        isLoading: true
    }
}

export const profileFailed = (err) => {
    return {
        type: ActionTypes.PROFILE_FAILED,
        error: err,
        isLoading: false
    }
}

export const profileSuccess = (response) => {
    return {
        type: ActionTypes.PROFILE_SUCCESS,
        response: response,
        isLoading: false
    }
}