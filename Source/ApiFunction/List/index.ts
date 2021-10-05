import { groupList } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiGetGroups = async () => {
    return await httpServices.get(`${groupList}`);
};
