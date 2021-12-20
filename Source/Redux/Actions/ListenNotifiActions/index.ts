import ActionTypes from "../../ActionTypes"

export const listenCheck = (data) => {
    return {
        type: ActionTypes.LISTENER_CHECKING,
        data: data,
    }
}



