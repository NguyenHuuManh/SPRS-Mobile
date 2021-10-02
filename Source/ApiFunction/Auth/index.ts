import { profile, signin, signup } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiSignin = async (body) => {
    return await httpServices.post(
        `${signin}`, body
    );
};

export const apiSigup = async (body) => {
    return await httpServices.post(
        `${signup}`, body
    );
};

export const apiGetProfile = async () => {
    return await httpServices.get(`${profile}`);
};
