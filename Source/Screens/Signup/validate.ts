import { isEmpty } from "lodash";
import moment from "moment";
import * as Yup from "yup";

export const register = Yup.object().shape({
    username: Yup.string().required("Tên tài khoản không được bỏ trống").nullable()
        .test("test", "Tên tài khoản không chứa kí tự đặc biệt ! #$%^&*()+,-=\[\]{};`:\"\\/?", function () {
            const { parent } = this;
            const { username } = parent;
            const nameStrim = username + ''.trim();
            var format = /[\s!#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
            return !format.test(nameStrim);
        }),
    phone: Yup.string().required("Số điện thoại không được bỏ trống").nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { phone } = parent;
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phone);
    }),
    password: Yup.string().required("không được bỏ trống").nullable()
        .test('checkSpace', "Mật khẩu không chứa khoảng trắng", function () {
            const { parent } = this;
            const { password } = parent;
            const regex = /\s/;
            return !regex.test(password)
        })
        .test("test", "Mật khẩu phải có cả chữ, sô, kí tự đặc biệt và tối thiểu 8 kí tự", function () {
            const { parent } = this;
            const { password } = parent;
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
            return regex.test(password);
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
            if (moment(moment(dob).valueOf()).isSameOrBefore(moment().valueOf())) {
                return true;
            }
            return false
        }),
    city: Yup.number().required("không được bỏ trống").nullable(),
    district: Yup.number().required("không được bỏ trống").nullable(),
    subDistrict: Yup.number().required("không được bỏ trống").nullable(),
    groupsId: Yup.string().required("không được bỏ trống").nullable(),
    rePassWord: Yup.mixed().required("Xác minh mật khẩu").test("test", "Mật khẩu không khớp", function () {
        const { parent } = this;
        const { rePassWord, password, city } = parent;
        return rePassWord == password

    }),

});
