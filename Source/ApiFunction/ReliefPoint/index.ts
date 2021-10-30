import { CITY, CREATE_RELIEF_POINT, GET_RELIEF_POINT } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiCreateReliefPoint = async (body) => {
    return await httpServices.post(`${CREATE_RELIEF_POINT}`, body);
};

export const apiGetReliefPoint = async (body) => {
    return await httpServices.post(`${GET_RELIEF_POINT}`, body);
};

