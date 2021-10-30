import { groupList, ITEMS } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiGetGroups = async () => {
    return await httpServices.get(`${groupList}`);
};

export const apiGetItemType = async () => {
    return await httpServices.get(`${ITEMS}`);
};
