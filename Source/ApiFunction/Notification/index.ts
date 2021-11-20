import { CREATE_DEVICE, GET_ALL_NOTIFICATION } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiCreateDevice = async (body) => {
    return await httpServices.post(
        `${CREATE_DEVICE}`, body
    );
};

export const apiGetAllNotification = async () => {
    return await httpServices.get(
        `${GET_ALL_NOTIFICATION}`
    );
};
