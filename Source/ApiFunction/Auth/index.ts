import { OTP_CHECKING, OTP_PASSWORD, profile, signin, signupUser, singupOrganization, singupStore } from "../../Constrants/api";
import httpServices from "../../Services/httpServices";

export const apiSignin = async (body) => {
    return await httpServices.post(
        `${signin}`, body
    );
};

export const apiSigup = async (body) => {
    if (body.groups_user[0].id + "" == "1") {
        return await httpServices.post(
            `${signupUser}`, body
        );
    }
    if (body.groups_user[0].id == 7) {
        return await httpServices.post(
            `${singupStore}`, body
        );
    }
};

export const apiGetProfile = async () => {
    return await httpServices.get(`${profile}`);
};

export const apiUpdate = async (param, body) => {
    return await httpServices.put(`${profile}/${param}`, body);
};

export const apiOtpPassword = async (body) => {
    return await httpServices.post(`${OTP_PASSWORD}`, body);
};

export const apiOtpChecking = async (body) => {
    return await httpServices.post(`${OTP_CHECKING}`, body);
};
