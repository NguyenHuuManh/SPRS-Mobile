import { CITY, DETAIL_PLACE_ID, DETAIL_PLACE_LAT_LNG, DISTRICT, PLACE_AUTOCOMPLETE, SUBDISTRICT } from "../../Constrants/api";
import { API_KEY_GOONG } from "../../Constrants/url";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiPlaceDetailByLongLat = async (long: string | number, lat: string | number) => {
    return await httpServices.get(
        `${DETAIL_PLACE_LAT_LNG}?latlng=${lat},${long}&api_key=${API_KEY_GOONG}`,
    );
};

export const apiPlaceDetailById = async (id: string) => {
    return await httpServices.get(
        `${DETAIL_PLACE_ID}?place_id=${id}&api_key=${API_KEY_GOONG}`,
    );
};

export const apiPlaceAutoComplete = async (key) => {
    const param = {
        api_key: API_KEY_GOONG,
        input: key
    }
    return await httpServices.get(
        `${PLACE_AUTOCOMPLETE}${convertToQuery(param)}`,
    );
};

export const apiCity = async () => {
    return await httpServices.get(`${CITY}`);
};

export const apiDistrict = async (id) => {
    return await httpServices.get(`${DISTRICT}${id}`);
}

export const apiSubDistrict = async (id) => {
    return await httpServices.get(`${SUBDISTRICT}${id}`);
}



