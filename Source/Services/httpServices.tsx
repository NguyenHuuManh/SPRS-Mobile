import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { isNull } from "lodash";
import { useDispatch } from "react-redux";
import { STATUS } from "../Constrants/url";
import { userActions } from "../Redux/Actions";
import { logout } from "../Redux/Actions/UserActions";
class Services {
    axios: any;
    interceptors: null;
    constructor() {
        this.axios = axios;
        this.interceptors = null;
        this.axios.defaults.withCredentials = true;
        this.axios.defaults.timeout = 300000;
    }

    saveLocalStorage = async (key: String, data: any) => {
        const { token, res } = data;
        const dataStore = {
            token,
            res,
        }
        try {
            await AsyncStorage.setItem(`${key}`, JSON.stringify(dataStore))
        } catch (error) {
            console.log(error)
        }
    }
    getLocalStorage = async (key) => {
        const item = await AsyncStorage.getItem(`${key}`);
        return item;
    }

    attachTokenToHeader(token?: string) {
        if (token) {
            this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            this.axios.defaults.headers.common["Content-Type"] = `application/json`;

        } else {
            delete this.axios.defaults.headers.common["Authorization"];
        }
    }

    handleResponse(response: AxiosResponse, error: AxiosError, isSuccess: boolean, url?: string) {
        if (isSuccess) {
            return response;
        } else {
            if (error.response && error.response.status === 401) {
                if ((url || "").includes("sprs/api/authenticate")) {
                    return;
                }
            }
            return error.response;
        }
    }

    // returnData(response) {
    //     console.log('returnData', response);
    //     let errorMessage = '';
    //     if (STATUS.success.includes(response.status)) {
    //         return {
    //             response: response.data,
    //             error: false,
    //         };
    //     }
    //     if (isNull(response.data)) {
    //         errorMessage = response.problem;
    //     } else if (
    //         STATUS.notFound.includes(response.data.status) ||
    //         STATUS.auth.includes(response.data.status)
    //     ) {
    //         errorMessage = `${response.data.message ? response.data.message : response.data}`;
    //     } else if (STATUS.error.includes(response.data.status)) {
    //         errorMessage = response.problem;
    //     } else {
    //         errorMessage = response.data.problem;
    //     }
    //     return {
    //         errorMessage,
    //         detail: response.data.error.details,
    //         error: true,
    //     };
    // };

    async get(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.get(url, config);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            return this.handleResponse({} as AxiosResponse, error, false, url);
        }
        // return this.axios.get(...arg);
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.post(url, data, config);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            return this.handleResponse({} as AxiosResponse, error, false, url);
        }
        // return this.axios.post(url, data, config);
    }

    async delete(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.delete(url, config);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            return this.handleResponse({} as AxiosResponse, error, false, url);
        }
    }

    async put(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.put(url, data, config);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            return this.handleResponse({} as AxiosResponse, error, false, url);
        }
    }
}
export default new Services();