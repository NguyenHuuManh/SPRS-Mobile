import ActionTypes from "../../ActionTypes"

export const netWorkChecking = (status) => {
    return {
        type: ActionTypes.NETWOTK_CHECKING,
        isConnect: status
    }
}
