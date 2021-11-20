import { isEmpty } from "lodash";
import * as Yup from "yup";

export const register = Yup.object().shape({
    username: Yup.string().required("không được bỏ trống").nullable(),
    phone: Yup.string().required("không được bỏ trống").nullable(),
    password: Yup.string().required("không được bỏ trống").nullable()
        .test("test", "Mật khẩu phải có cả chữ, sô, kí tự đặc biệt và tối thiểu 8 kí tự", function () {
            const { parent } = this;
            const { password } = parent;
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
            return regex.test(password);
        }),
    full_name: Yup.string().required("không được bỏ trống").nullable(),
    dob: Yup.string().required("không được bỏ trống").nullable(),
    // nameOrg: Yup.string().required("không được bỏ trống").nullable(),
    city: Yup.number().required("không được bỏ trống").nullable(),
    district: Yup.number().required("không được bỏ trống").nullable(),
    subDistrict: Yup.number().required("không được bỏ trống").nullable(),
    // adressString: Yup.string().required("không được bỏ trống").nullable(),
    groupsId: Yup.string().required("không được bỏ trống").nullable(),
    rePassWord: Yup.mixed().required("Xác minh mật khẩu").test("test", "Mật khẩu không khớp", function () {
        const { parent } = this;
        const { rePassWord, password, city } = parent;
        console.log("parent", parent);
        return rePassWord == password

    }),

});
