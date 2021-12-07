import { isEmpty } from "lodash";
import moment from "moment";
import * as Yup from "yup";

export const updateForm = Yup.object().shape({
    // username: Yup.string().required("Tên tài khoản không được bỏ trống").nullable()
    //     .test("test", "Tên tài khoản tối thiểu 4, tối đa 16 kí tự gồm chữ và số", function () {
    //         const { parent } = this;
    //         const { username } = parent;
    //         const nameStrim = username + ''.trim();
    //         var format1 = /^[0-9a-zA-Z](?=.*[a-zA-Z]).{4,16}$/;
    //         var format2 = /^[a-zA-Z].{4,16}$/;
    //         return format1.test(nameStrim) || format2.test(nameStrim);
    //     }),
    phone: Yup.string().required("Số điện thoại không được bỏ trống").nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { phone } = parent;
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var checkNumber = /^[0-9]+$/
        return vnf_regex.test(phone) && checkNumber.test(phone);
    }),
    full_name: Yup.string().required("Họ và tên không được bỏ trống").nullable()
        .test("test", "Họ và tên không chứa kí tự đặc biệt ! #$%^&*()+,-=\[\]{};`:\"\\/?", function () {
            const { parent } = this;
            const { full_name } = parent;
            var format = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            return !format.test(full_name);
        }),
    dob: Yup.string().required("không được bỏ trống").nullable()
        .test("test", "Ngày sinh không được lớn hơn ngày hiện tại", function () {
            const { parent } = this;
            const { dob } = parent;
            const arr = dob.split("-");
            let dateStr = arr[2] + arr[1] + arr[0];
            if (moment(moment(dateStr).valueOf()).isSameOrBefore(moment().format("YYYY-MM-DD"))) {
                return true;
            }
            return false
        }),
    city: Yup.number().required("không được bỏ trống").nullable(),
    district: Yup.number().required("không được bỏ trống").nullable(),
    subDistrict: Yup.number().required("không được bỏ trống").nullable(),
});
