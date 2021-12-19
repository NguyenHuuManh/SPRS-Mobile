import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Alert } from "react-native";
import { pendingActions, userActions } from "../Redux/Actions";
import { store } from "../Store"
import { isUndefined } from "lodash"
import Toast from "react-native-toast-message";
import { URL } from "../Constrants/url";
class Services {
    axios: any;
    interceptors: null;
    constructor() {
        this.axios = axios;
        this.interceptors = null;
        this.axios.defaults.withCredentials = false;
        this.axios.defaults.timeout = 30000;
    }

    attachTokenToHeader(token?: string) {
        if (token) {
            this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete this.axios.defaults.headers.common["Authorization"];
        }

    }


    handleResponse(response: AxiosResponse, error: AxiosError, isSuccess: boolean, url?: string) {
        console.log('error', error.response);
        console.log('response', response)
        if (isSuccess) {
            if (response?.data?.code == '501') {
                if (!store.getState().pendingReducer.isPending) {
                    // store.dispatch(pendingActions.pendingLogout(true));
                    Alert.alert(
                        'Yêu cầu đăng nhập',
                        'Phiên đăng nhập hết hạn?',
                        [
                            {
                                text: 'Đăng nhập',
                                onPress: () => store.dispatch(userActions.logout({ data: store.getState().userReducer, isexpired: true }))
                            },
                        ],
                        { cancelable: false },
                        //clicking out side of alert will not cancel
                    );
                    return;
                }
            }
            return response;
        } else {
            if (error?.response?.status == 401) {
                if (url == `${URL}/authenticate-mobile`) {
                    return error?.response
                };
                if (!store.getState().pendingReducer.isPending) {
                    Alert.alert(
                        'Yêu cầu đăng nhập',
                        'Phiên đăng nhập hết hạn?',
                        [
                            {
                                text: 'Đăng nhập',
                                onPress: () => store.dispatch(userActions.logout({ data: store.getState().userReducer, isexpired: true }))
                            },
                        ],
                        { cancelable: false },
                        //clicking out side of alert will not cancel
                    );
                    return
                }
            }
            if (isUndefined(error?.response)) {
                if (store.getState().networkCheckingReducer.isConnect) {
                    Toast.show({
                        type: "error",
                        text1: "Hệ thống đang bảo trì",
                        position: "top"
                    })
                }
                return
            }
            return error?.response;
        }
    }

    async get(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.get(url, config);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            // console.log("url", url);
            // console.log("errorCatch", error)
            return this.handleResponse({} as AxiosResponse, error, false, url);
        }
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            const response = await this.axios.post(url, data, config);
            // console.log("responsePost", response);
            return this.handleResponse(response, {} as AxiosError, true, url);
        } catch (error) {
            console.log('error', error);
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