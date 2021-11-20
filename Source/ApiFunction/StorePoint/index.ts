import axios from "axios";
import { CREATE_STORE_POINT, DELETE_STORE_POINT, GET_STORE_POINT, GET_SUBCRIBLE_STORE, SUBCRIBLE_STORE, UNSUBCRIBLE_STORE, UPDATE_STORE_POINT, UPLOAD_IMG_STORE } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiCreateStore = async (body) => {
    return await httpServices.post(`${CREATE_STORE_POINT}`, body);
};

export const apiGetStore = async () => {
    return await httpServices.get(`${GET_STORE_POINT}`);
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

export const apiUploadImg = async (bodyFormData) => {
    return await axios({
        method: "post",
        url: `${UPLOAD_IMG_STORE}`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then(function (response) {
            //handle success
            return response
        })
        .catch(function (response) {
            //handle error
            return response;
        });
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



