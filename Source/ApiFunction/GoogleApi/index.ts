import { API_KEY, API_KEY_GOONG, URL_GOOGLE, URL_GOONG } from "../../Constrants/url";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiPlaceDetailByLongLat = async (long: string | number, lat: string | number) => {
    return await httpServices.get(
        `${URL_GOONG}?latlng=${lat},${long}&api_key=${API_KEY_GOONG}`,
    );
};


