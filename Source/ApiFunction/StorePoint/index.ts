import axios from "axios";
import { CREATE_STORE_POINT, DELETE_STORE_POINT, GET_ALL_STORE, GET_STORE_POINT, GET_SUBCRIBLE_STORE, SUBCRIBLE_STORE, UNSUBCRIBLE_STORE, UPDATE_STATUS_STORE, UPDATE_STORE_POINT, UPLOAD_IMG_STORE } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiCreateStore = async (body) => {
    return await httpServices.post(`${CREATE_STORE_POINT}`, body);
};

export const apiGetStore = async (body) => {
    return await httpServices.post(`${GET_STORE_POINT}`, body);
};

export const apiGetStoreAll = async () => {
    return await httpServices.get(`${GET_ALL_STORE}`);
};

export const apiDeleteStore = async (body) => {
    return await httpServices.put(`${DELETE_STORE_POINT}`, body);
};

export const apiGetStoreDetail = async (id) => {
    return await httpServices.get(`${GET_STORE_POINT}/${id}`);
};

export const apiUpdateStore = async (body) => {
    return await httpServices.post(`${UPDATE_STORE_POINT}`, body);
};

export const apiUpdateStatus = async (body) => {
    return await httpServices.post(`${UPDATE_STATUS_STORE}`, body);
};

export const apiUploadImg = async (body) => {
    return await httpServices.post(`${UPLOAD_IMG_STORE}`, body);
};

export const apiSubcribleStore = async (body) => {
    return await httpServices.post(`${SUBCRIBLE_STORE}`, body);
};

export const apiUnSubcribleStore = async (body) => {
    return await httpServices.post(`${UNSUBCRIBLE_STORE}`, body);
};

export const apiGetSubcribleStore = async () => {
    return await httpServices.get(`${GET_SUBCRIBLE_STORE}`,);
};



