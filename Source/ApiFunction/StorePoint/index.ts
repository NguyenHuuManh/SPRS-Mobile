import { CREATE_STORE_POINT, GET_STORE_POINT, GET_SUBCRIBLE_STORE, SUBCRIBLE_STORE, UNSUBCRIBLE_STORE, UPDATE_STORE_POINT } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
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

export const apiSubcribleStore = async (body) => {
    return await httpServices.post(`${SUBCRIBLE_STORE}`, body);
};

export const apiUnSubcribleStore = async (body) => {
    return await httpServices.post(`${UNSUBCRIBLE_STORE}`, body);
};

export const apiGetSubcribleStore = async () => {
    return await httpServices.post(`${GET_SUBCRIBLE_STORE}`,);
};



