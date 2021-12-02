import { ORG_PUBLIC, RELIEF_PUBLIC, SOS_PUBLIC, STORE_PUBLIC } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiGetReliefPointCommon = async (param) => {
    console.log("param", param);
    return await httpServices.get(`${RELIEF_PUBLIC}${convertToQuery(param)}`);
};

export const apiGetStoreCommon = async (id) => {
    console.log("param", id);
    return await httpServices.get(`${STORE_PUBLIC}/${id}`);
};

export const apiGetSOSCommon = async (param) => {
    return await httpServices.get(`${SOS_PUBLIC}${convertToQuery(param)}`);
};

export const apiGetORGCommon = async (param) => {
    return await httpServices.get(`${ORG_PUBLIC}${convertToQuery(param)}`);
};






