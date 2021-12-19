import ActionTypes from "../../ActionTypes"

export const notificationSuccess = (data) => {
    return {
        type: ActionTypes.NOTIFICATION_SUCCESS,
        data: data,
    }
}

export const notificationFailed = (data) => {
    return {
        type: ActionTypes.NOTIFICATION_FAILED,
        data: data
    }
}

export const notificationRequest = (payload) => {
    return {
        type: ActionTypes.NOTIFICATION_REQUEST,
        isRefesh: payload.isRefesh,
        pageSize: payload.pageSize,
        pageIndex: payload.pageIndex
    }
}

