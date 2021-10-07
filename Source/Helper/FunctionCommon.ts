
import { AxiosResponse } from "axios"
import React from "react"
import { Platform, View } from "react-native"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import { useDispatch } from "react-redux"
import { userActions } from "../Redux/Actions"

export const handleLocationPermission = async () => { // 👈
    let permissionCheck = ""
    if (Platform.OS === "ios") {
        permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

        if (permissionCheck === RESULTS.DENIED) {
            const permissionRequest = await request(
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            )
            permissionRequest === RESULTS.GRANTED
                ? console.warn("Location permission granted.")
                : console.warn("Location perrmission denied.")
        }
    }

    if (Platform.OS === "android") {
        permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

        if (permissionCheck === RESULTS.DENIED) {
            const permissionRequest = await request(
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            )
            permissionRequest === RESULTS.GRANTED
                ? console.warn("Location permission granted.")
                : console.warn("Location perrmission denied.")
        }
        console.log("permissionCheck ", permissionCheck)

    }
}

interface ErrorCall {
    data: any;
    statusText: string;
}

const SUCCESS_STATUS = [200, 201, 202, 203, 204];
// const dispatch = useDispatch();
export const checkCallAPI = (
    response: AxiosResponse | any,
    onSuccess: (data: any) => void,
    onError: (data: ErrorCall) => void
) => {
    console.log("responseCheckCall", response);
    if (response?.status && SUCCESS_STATUS.includes(response!.status)) {
        onSuccess(response!.data);
        return;
    }
    onError({ data: response?.data, statusText: response?.statusText });
};
