
import { AxiosResponse } from "axios"
import { isEmpty, isNaN } from "lodash"
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
    if (response?.status && SUCCESS_STATUS.includes(response!.status)) {
        onSuccess(response!.data);
        return;
    }
    onError({ data: response?.data, statusText: response?.statusText });
};

export function convertToQuery(param: any) {
    return (
        "?" +
        Object.keys(param)
            .map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(param[key]);
            })
            .join("&")
    );
}

export const converQueryToObject = (querystring: any) => {
    // parse query string
    const params = new URLSearchParams(querystring) as any;

    let obj = {} as any;
    // iterate over all keys
    for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
            obj[key] = params.getAll(key);
        } else {
            obj[key] = params.get(key);
        }
    }
    return obj;
};

export const filterDetailPalce = (res) => {
    let city = "";
    let province = "";
    let district: "";
    let subDistrict: "";
    let check = true;
    console.log("res", res)

    for (const element of res) {
        let types = element?.types || [];
        if (types.every((elm => ["political", "sublocality", "sublocality_level_1"].includes(elm)))) {
            subDistrict = element.address_components[0].long_name;
            console.log("---sublocality----");
            check = false;
        }

        console.log("type", types)
        if (types.every((elm => ["political", "administrative_area_level_3"].includes(elm)))) {
            if (check) {
                subDistrict = element.address_components[0].long_name;
                city = element.address_components[3].long_name;
                province = element.address_components[2].long_name;
                district = element.address_components[1].long_name;
                const place = {
                    city: city,
                    province: province,
                    district: district,
                    subDistrict: subDistrict,
                }
                return place;
            }

        }

        if (types.every((elm => ["political", "administrative_area_level_2"].includes(elm)))) {
            if (!check) {
                district = element.address_components[0]?.long_name;
                city = element.address_components[2]?.long_name;
                province = element.address_components[1]?.long_name;
                const place = {
                    city: city,
                    province: province,
                    district: district,
                    subDistrict: subDistrict,
                }
                return place;
            }

        }
    };
    return;
}



export function checkKeyNull(obj: any) {
    for (let v in obj) {
        // if (typeof obj[v] !== "boolean") {
        //   if (isEmpty(obj[v])) {
        //     delete obj[v];
        //   } else if (typeof obj[v] == "string") obj[v] = obj[v].trim();
        // }
        switch (typeof obj[v]) {
            case "number":
                if (isNaN(obj[v]) || obj[v] == null) delete obj[v];
                break;
            case "string":
                if (isEmpty(obj[v])) delete obj[v];
                else obj[v] = obj[v].trim();
                break;
            case "boolean":
                break;
            default:
                if (obj[v] == null || isEmpty(obj[v])) delete obj[v];
                break;
        }
    }
    return obj;
}

