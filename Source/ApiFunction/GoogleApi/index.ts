import { PLACE_AUTOCOMPLETE } from "../../Constrants/api";
import { API_KEY_GOONG, URL_GOONG } from "../../Constrants/url";
import httpServices from "../../Services/httpServices";

export const apiPlaceDetailByLongLat = async (long: string | number, lat: string | number) => {
    return await httpServices.get(
        `${URL_GOONG}?latlng=${lat},${long}&api_key=${API_KEY_GOONG}`,
    );
};

export const apiPlaceAutoComplete = async (key) => {
    const param = {

    }

    return await httpServices.get(
        `${PLACE_AUTOCOMPLETE}`,
    );
};


