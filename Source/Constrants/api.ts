import { URL, URL_GOOGLE, URL_GOONG } from "./url";

export const signupUser = `${URL}/sprs/api/users_v2/user`;
export const signupStore = `${URL}/sprs/api/users_v2/ownStore`;
export const singupOrganization = `${URL}/sprs/api/users_v2/organizationlAdmin`
export const singupStore = `${URL}/sprs/api/users_v2/ownStore`
//
export const signin = `${URL}/authenticate-mobile`;
export const profile = `${URL}/sprs/api/user`;
export const UPDATE_PROFILE = `${URL}/sprs/api/user/update/infor`
//
export const groupList = `${URL}/sprs/api/groups-register-mobile`
export const ITEMS = `${URL}/sprs/api/item`
//
export const MENU_PERMISSON = `${URL}/sprs/api/permissions/getOwn-mobile`


export const UPDATE_PASS = `${URL}/sprs/api/user/update/password`

export const OTP_PASSWORD = `${URL}/sprs/api/generateOtp`

export const OTP_CHECKING = `${URL}/sprs/api/validateOtp`

export const RESET_PASSWORD = `${URL}/sprs/api/forgotPassword`

// export const PLACE_AUTOCOMPLETE = `${URL_GOOGLE}/place/autocomplete/json`

export const PLACE_AUTOCOMPLETE = `${URL_GOONG}/Place/AutoComplete`

export const PLACE_AUTOCOMPLETE_MAP = `${URL}/sprs/api/manage-map/search`

export const DETAIL_PLACE_LAT_LNG = `${URL_GOONG}/Geocode`

export const DETAIL_PLACE_ID = `${URL_GOONG}/Place/Detail`

//api danh muc
export const CITY = `${URL}/sprs/api/address/city`
export const DISTRICT = `${URL}/sprs/api/address/district/`
export const SUBDISTRICT = `${URL}/sprs/api/address/subdistrict/`
export const STORE_CATEGORY = `${URL}/sprs/api/store-category/get`

//api tao diem cuu tro
export const CREATE_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/create`
export const GET_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/get`
export const GET_RELIEF_POINT_DETAIL = `${URL}/sprs/api/reliefPoint-manage/reliefPoint`
export const UPDATE_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/update`
export const UPDATE_STATUS_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/update-status`
export const DELETE_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/delete`
export const UPLOAD_IMG_RELIEF = `${URL}/sprs/api/reliefPoint-manage/uploadImg`


//api store
export const CREATE_STORE_POINT = `${URL}/sprs/api/store-manage/create`
export const UPDATE_STORE_POINT = `${URL}/sprs/api/store-manage/update`
export const GET_STORE_POINT = `${URL}/sprs/api/store-manage/get`
export const DELETE_STORE_POINT = `${URL}/sprs/api/store-manage/delete`

export const SUBCRIBLE_STORE = `${URL}/sprs/api/store-manage/subcribe`
export const UNSUBCRIBLE_STORE = `${URL}/sprs/api/store-manage/unsubcribe`
export const GET_SUBCRIBLE_STORE = `${URL}/sprs/api/store-manage/getSubcribe`

export const UPLOAD_IMG_STORE = `${URL}/sprs/api/store-manage/uploadImg`
export const UPDATE_STATUS_STORE = `${URL}/sprs/api/store-manage/openCloseStore`
export const GET_ALL_STORE = `${URL}/sprs/api/store-manage/getAll`
//SOS
export const UPDATE_SOS = `${URL}/sprs/api/sos-manage/update`
export const GET_SOS = `${URL}/sprs/api/sos-manage/get`

//loadMap
export const LOAD_MAP = `${URL}/sprs/api/manage-map/getPoints`
//Notification
export const CREATE_DEVICE = `${URL}/sprs/api/device/create`
export const DELETE_DEVICE = `${URL}/sprs/api/device/delete`
export const UPDATE_ADDRESS_DEVICE = `${URL}/sprs/api/device/update`
export const GET_ALL_NOTIFICATION = `${URL}/sprs/api/notification-manage/get-all`
export const GET_UNCHECK_NOTIFICATION = `${URL}/sprs/api/notification-manage/notification/uncheck`
export const UPDATE_NOTIFICATION_STATUS = `${URL}/sprs/api/notification-manage/update`
export const GET_NOTIFICATION_ID = `${URL}/sprs/api/notification-manage/get`

// detail point public
export const ORG_PUBLIC = `${URL}/sprs/api/organization-manage/common/origanization`
export const STORE_PUBLIC = `${URL}/sprs/api/store-manage/common/get`
export const RELIEF_PUBLIC = `${URL}/sprs/api/reliefPoint-manage/common/reliefPoint`
export const SOS_PUBLIC = `${URL}/sprs/api/sos-manage/common/get`
