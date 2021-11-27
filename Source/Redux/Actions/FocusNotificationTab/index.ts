import ActionTypes from "../../ActionTypes"

export const changeStatus = (payload) => {
    return {
        type: ActionTypes.FORCUS_NOTIFICATION_TAB,
        payload: payload
    }
}

