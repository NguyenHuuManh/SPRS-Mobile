import { GET_EVENTS, GET_EVENTS_DETAIL, UPDATE_EVENT, VERIFY_POINT } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiGetEvents = async (body) => {
    return await httpServices.post(`${GET_EVENTS}`, body);
};

export const apiGetEventDetail = async (param) => {
    return await httpServices.get(`${GET_EVENTS_DETAIL}${convertToQuery(param)}`);
};

export const apiUpdateEventPoint = async (body) => {
    return await httpServices.put(`${UPDATE_EVENT}`, body);
};

export const apiVerifyPoint = async (params) => {
    return await httpServices.get(`${VERIFY_POINT}${convertToQuery(params)}`);
};



