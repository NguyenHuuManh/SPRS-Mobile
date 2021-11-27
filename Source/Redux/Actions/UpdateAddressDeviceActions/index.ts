import ActionTypes from "../../ActionTypes"

export const updateRequest = (payload) => {
    return {
        type: ActionTypes.UPDATE_ADDRESS_DEVICE_REQUEST,
        isLoading: true,
        payload: payload
    }
}

export const updateFailed = (err) => {
    return {
        type: ActionTypes.UPDATE_ADDRESS_DEVICE_FAILED,
        error: err,
        isLoading: false
    }
}

export const updateSuccess = (response) => {
    return {
        type: ActionTypes.UPDATE_ADDRESS_DEVICE_SUCCESS,
        response: response,
        isLoading: false
    }
}