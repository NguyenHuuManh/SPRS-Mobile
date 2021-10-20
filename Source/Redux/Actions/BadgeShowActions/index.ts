import ActionTypes from "../../ActionTypes"

export const badgeShow = (payload) => {
    return {
        type: ActionTypes.BADGE_SHOW,
        payload: payload
    }
}
