import { URL, URL_GOOGLE, URL_GOONG } from "./url";

export const signupUser = `${URL}/sprs/api/users_v2/user`;
export const signupStore = `${URL}/sprs/api/users_v2/ownStore`;
export const singupOrganization = `${URL}/sprs/api/users_v2/organizationlAdmin`
export const singupStore = `${URL}/sprs/api/users_v2/organizationlAdmin`
//
export const signin = `${URL}/authenticate`;
export const profile = `${URL}/sprs/api/user`;
export const UPDATE_PROFILE = `${URL}/sprs/api/user/update/infor`
//
export const groupList = `${URL}/sprs/api/group`
export const ITEMS = `${URL}/sprs/api/item`
//

export const UPDATE_PASS = `${URL}/sprs/api/user/update/password`

export const OTP_PASSWORD = `${URL}/sprs/api/generateOtp`

export const OTP_CHECKING = `${URL}/sprs/api/validateOtp`

// export const PLACE_AUTOCOMPLETE = `${URL_GOOGLE}/place/autocomplete/json`

export const PLACE_AUTOCOMPLETE = `${URL_GOONG}/Place/AutoComplete`

export const DETAIL_PLACE_LAT_LNG = `${URL_GOONG}/Geocode`

export const DETAIL_PLACE_ID = `${URL_GOONG}/Place/Detail`

//api danh muc
export const CITY = `${URL}/sprs/api/address/city`
export const DISTRICT = `${URL}/sprs/api/address/district/`
export const SUBDISTRICT = `${URL}/sprs/api/address/subdistrict/`

//api tao diem cuu tro

export const CREATE_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/create`
export const GET_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/get`
//



