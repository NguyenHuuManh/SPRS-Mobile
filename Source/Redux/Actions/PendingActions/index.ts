import ActionTypes from "../../ActionTypes"

export const pendingLogout = (status) => {
    return {
        type: ActionTypes.PENDING_LOGOUT,
        isPending: status
    }
}
