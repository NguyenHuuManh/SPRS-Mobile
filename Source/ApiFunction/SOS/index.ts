import axios from "axios";
import { CREATE_STORE_POINT, GET_SOS, GET_STORE_POINT, GET_SUBCRIBLE_STORE, SUBCRIBLE_STORE, UNSUBCRIBLE_STORE, UPDATE_SOS, UPDATE_STATUS_SOS, UPDATE_STORE_POINT, UPLOAD_IMG_STORE } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiUpdateSOS = async (body) => {
    return await httpServices.post(`${UPDATE_SOS}`, body);
};

export const apiGetSOS = async () => {
    return await httpServices.get(`${GET_SOS}`);
};




