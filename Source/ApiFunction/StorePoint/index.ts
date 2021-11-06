import { CREATE_STORE_POINT, GET_STORE_POINT, UPDATE_STORE_POINT } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiCreateStore = async (body) => {
    return await httpServices.post(`${CREATE_STORE_POINT}`, body);
};

export const apiGetStore = async () => {
    return await httpServices.get(`${GET_STORE_POINT}`);
};

export const apiGetStoreDetail = async (id) => {
    return await httpServices.get(`${GET_STORE_POINT}/${id}`);
};

export const apiUpdateStore = async (body) => {
    return await httpServices.post(`${UPDATE_STORE_POINT}`, body);
};



