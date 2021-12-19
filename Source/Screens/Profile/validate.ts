import { isEmpty } from "lodash";
import moment from "moment";
import * as Yup from "yup";
import { removeAscent } from "../../Helper/FunctionCommon";

export const updateForm = Yup.object().shape({
    phone: Yup.string().required("Số điện thoại không được bỏ trống").nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { phone } = parent;
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var checkNumber = /^[0-9]+$/
        return vnf_regex.test(phone) && checkNumber.test(phone);
    }),
    full_name: Yup.string().required("Họ và tên không được bỏ trống").nullable()
        .test("test", "Họ và tên không chứa số, kí tự đặc biệt, 2 khoảng trắng liên tục và ít nhất 4 ký tự chữ gồm 2 từ trở lên", function () {
            const { parent } = this;
            const { full_name } = parent;
            const nameStrim = removeAscent(full_name);
            if (nameStrim?.length < 4) return false;
            if (nameStrim?.replace(' ', '').length < 4) return false
            let regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/
            return regex.test(nameStrim?.trim());
        }),
    dob: Yup.string().required("không được bỏ trống").nullable()
        .test("test", "Ngày sinh không được lớn hơn ngày hiện tại", function () {
            const { parent } = this;
            const { dob } = parent;
            const currentDate = moment().format('DD-MM-YYYY');
            if (moment(dob, 'DD-MM-YYYY').isSameOrBefore(moment(currentDate, 'DD-MM-YYYY'))) {
                return true;
            }
            return false
        }),
    city: Yup.number().required("không được bỏ trống").nullable(),
    district: Yup.number().required("không được bỏ trống").nullable(),
    subDistrict: Yup.number().required("không được bỏ trống").nullable(),
});
