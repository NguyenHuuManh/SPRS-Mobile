import { CITY, CREATE_RELIEF_POINT, DELETE_RELIEF_POINT, GET_EVENTS, GET_EVENTS_DETAIL, GET_RELIEF_POINT, GET_RELIEF_POINT_DETAIL, RELIEF_PUBLIC, UPDATE_RELIEF_POINT, UPDATE_STATUS_RELIEF_POINT, UPLOAD_IMG_RELIEF } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiGetEvents = async (body) => {
    return await httpServices.post(`${GET_EVENTS}`, body);
};

export const apiGetEventDetail = async (param) => {
    return await httpServices.get(`${GET_EVENTS_DETAIL}${convertToQuery(param)}`);
};



