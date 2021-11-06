import { CITY, CREATE_RELIEF_POINT, GET_RELIEF_POINT, UPDATE_RELIEF_POINT } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiCreateReliefPoint = async (body) => {
    return await httpServices.post(`${CREATE_RELIEF_POINT}`, body);
};

export const apiGetReliefPoint = async () => {
    return await httpServices.get(`${GET_RELIEF_POINT}`);
};

export const apiUpdateReliefPoint = async (body) => {
    return await httpServices.get(`${UPDATE_RELIEF_POINT}`, body);
};

