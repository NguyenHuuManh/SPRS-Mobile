import { CREATE_DEVICE, DELETE_DEVICE, GET_ALL_NOTIFICATION, GET_NOTIFICATION_ID, GET_UNCHECK_NOTIFICATION, UPDATE_ADDRESS_DEVICE, UPDATE_NOTIFICATION_STATUS } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiCreateDevice = async (body) => {
    return await httpServices.post(
        `${CREATE_DEVICE}`, body
    );
};

export const apiGetAllNotification = async (params) => {
    return await httpServices.get(
        `${GET_ALL_NOTIFICATION}${convertToQuery(params)}`
    );
};

export const apiGetNotificationId = async (id) => {
    return await httpServices.get(
        `${GET_NOTIFICATION_ID}/${id}`
    );
};

export const apiGetUncheckNotification = async () => {
    return await httpServices.get(
        `${GET_UNCHECK_NOTIFICATION}`
    );
};

export const apiDeleteDevice = async (params) => {
    return await httpServices.delete(
        `${DELETE_DEVICE}${convertToQuery(params)}`
    );
};

export const apiUpdateAddressDivice = async (body, idDevice) => {
    return await httpServices.put(`${UPDATE_ADDRESS_DEVICE}/${idDevice}`, body);
};

export const apiUpdateStatusNotification = async (params) => {
    return await httpServices.put(
        `${UPDATE_NOTIFICATION_STATUS}/${params.id}${convertToQuery({ status: params.status })}`
    );
};