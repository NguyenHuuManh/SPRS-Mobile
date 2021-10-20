import axios from "axios";
import { saveTokenDevice, sendMessageAll } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiSaveTokenDevice = async (body) => {
    return await httpServices.post(
        `${saveTokenDevice}`, body
    );
};

export const apiSenAll = async (body) => {
    console.log("bodySend", body)
    return await httpServices.post(
        `${sendMessageAll}`, body
    );
};

