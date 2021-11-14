import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Alert } from "react-native";
import { pendingActions, userActions } from "../Redux/Actions";
import { store } from "../Store"
import { isUndefined } from "lodash"
import Toast from "react-native-toast-message";
class Services {
    axios: any;
    interceptors: null;
    constructor() {
        this.axios = axios;
        this.interceptors = null;
        this.axios.defaults.withCredentials = false;
        this.axios.defaults.timeout = 30000;
        // this.axios.defaults.headers.common["Content-Type"] = `application/json; multipart/form-data`;
        // this.axios.defaults.headers = {
        //     "Access-Control-Allow-Headers": "*",
        //     "Access-Control-Allow-Methods": "*",
        //     "Content-Type": "application/json"
        // };
    }

    attachTokenToHeader(token?: string) {
        // console.log("token", token)
        if (token) {
            // this.interceptors = this.axios.interceptors.request.use(
            //     function (config) {
            //         // Do something before request is sent
            //         config.headers.Authorization = `Bearer ${token}`;
            //         return config;
            //     },
            //     function (error) {
            //         return Promise.reject(error);
            //     }
            // );
            this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete this.axios.defaults.headers.common["Authorization"];
        }

    }


    handleResponse(response: AxiosResponse, error: AxiosError, isSuccess: boolean, url?: string) {
        // console.log("err", error?.response);
        // console.log("response", response);
        if (isSuccess) {
            if (response.data.code + "" == "501") {
                if (!store.getState().pendingReducer.isPending) {
                    store.dispatch(pendingActions.pendingLogout(true));
                    Alert.alert(
                        'Yêu cầu đăng nhập',
                        'Phiên đăng nhập hết hạn?',
                        [
                            {
                                text: 'Đăng nhập',
                                onPress: () => store.dispatch(userActions.logout())
                            },
                        ],
                        { cancelable: false },
                        //clicking out side of alert will not cancel
                    );
                    return
                }
            }
            return response;
        } else {
            if (error.response && error.response?.status === 401) {

                if ((url || "").includes("sprs/api/authenticate")) {
                    return;
                }
            }
            if (error.response?.status == 501) {

                if (!store.getState().pendingReducer.isPending) {
                    store.dispatch(pendingActions.pendingLogout(true));
                    Alert.alert(
                        'Yêu cầu đăng nhập',
                        'Phiên đăng nhập hết hạn?',
                        [
                            {
                                text: 'Đăng nhập',
                                onPress: () => store.dispatch(userActions.logout())
                            },
                        ],
                        { cancelable: false },
                        //clicking out side of alert will not cancel
                    );
                    return
                }
            }
            if (isUndefined(error?.response)) {
                Toast.show({
                    type: "error",
                    text1: "Không có kết nốt internet",
                    position: "top"
                })
                return
            }
            return error.response;
        }
    }

    async get(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.get(url, config);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            console.log("errorGet", error)
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