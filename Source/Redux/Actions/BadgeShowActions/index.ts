import ActionTypes from "../../ActionTypes"

export const badgeResults = (payload) => {
    return {
        type: ActionTypes.BADGE_RESULTS,
        payload: payload
    }
}

export const badgeFailed = (payload) => {
    return {
        type: ActionTypes.BADGE_FAILED,
        payload: payload
    }
}

export const badgeRequest = () => {
    return {
        type: ActionTypes.BADGE_REQUEST,
    }
}

