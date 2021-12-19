
import { AxiosResponse } from "axios"
import { isEmpty, isNaN } from "lodash"
import React from "react"
import { Platform, View } from "react-native"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import { useDispatch } from "react-redux"
import { userActions } from "../Redux/Actions"
import { getCurrentRoute, navigate, navigationRef } from "./RootNavigation"

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
        return true;
    }

    if (Platform.OS === "android") {
        permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        console.log("permissionCheck ", permissionCheck);
        if (permissionCheck === RESULTS.DENIED) {
            const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            return permissionRequest === RESULTS.GRANTED
        }
        return true;
    }
    return false;
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

    for (const element of res) {
        let types = element?.types || [];
        if (types.every((elm => ["political", "sublocality", "sublocality_level_1"].includes(elm)))) {
            subDistrict = element.address_components[0].long_name;
            check = false;
        }

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

export function checkLatLng(lat, long) {
    if (lat == 'NaN' || long == 'NaN' || isEmpty(lat) || isEmpty(long) || isNaN(Number(lat) || isNaN(Number(long)))) return false
    return true;
}

export function addressToString(address: string) {
    const keys = ['Xã', 'Huyện', 'Quận', 'Tỉnh', 'Phường'];
    let addressArr = address.split(" ");
    let addressTemp = "";
    if (keys.includes(addressArr[0])) {
        addressArr.splice(0, 1);
    }
    // console.log("addressArr", addressArr);
    addressArr.forEach((e, index) => {
        if (index == addressArr.length) {
            addressTemp += e;
        } else {
            addressTemp += e + " ";
        }
    });
    addressTemp = addressTemp.replace('Thành phố', '');
    addressTemp = addressTemp.replace('Thị Trấn', '');
    addressTemp = addressTemp.replace('Thị Xã', '');
    return addressTemp;
}

export function checkKeyNull(obj: any) {
    for (let v in obj) {
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

export function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export function haversineDistance(latlngA, latlngB, isMiles) {
    const squared = x => x * x;
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // Earth’s mean radius in km

    const dLat = toRad(latlngB[0] - latlngA[0]);
    const dLon = toRad(latlngB[1] - latlngA[1]);

    const dLatSin = squared(Math.sin(dLat / 2));
    const dLonSin = squared(Math.sin(dLon / 2));

    const a = dLatSin +
        (Math.cos(toRad(latlngA[0])) * Math.cos(toRad(latlngB[0])) * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    if (isMiles) distance /= 1.609344;
    return distance;
}

export const addAnItems = (targetArray, itemForAdd, key) => {
    const arrayAfterFilterItem = targetArray.filter((elm) => elm[key] !== itemForAdd[key]);
    if (arrayAfterFilterItem.length === targetArray.length) {
        arrayAfterFilterItem.push(itemForAdd);
    }
    return arrayAfterFilterItem;
};

export function compareTime(str1, str2) {
    if (str1 === str2) {
        return false;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if (eval(time1[0]) > eval(time2[0])) {
        return true;
    } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return true;
    } else {
        return false;
    }
}

export function backAction() {
    // getCurrentRoute();
    // console.log('backAction', navigationRef.getCurrentRoute());
    console.log('fsfdsfsd');
    return true;
}

function timeSince(date) {
    const currentDate = new Date();
    let seconds = Math.floor((currentDate - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " phút trước";
    }
    return Math.floor(seconds) + " giây trước";
}

export function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}



