import ActionTypes from "../../ActionTypes";

interface Props {
    type?: "success" | "error";
    message?: string;
    position?: "top" | "bottom";
    isShow: boolean;
}

export const toatShow = (payload: Props) => {
    return {
        type: ActionTypes.TOAST_SHOW,
        payload: payload
    };
}