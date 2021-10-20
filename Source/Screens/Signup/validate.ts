import { isEmpty } from "lodash";
import * as Yup from "yup";

export const register = Yup.object().shape({
    username: Yup.string().required("không được bỏ trống").nullable(),
    phone: Yup.string().required("không được bỏ trống").nullable(),
    password: Yup.string().required("không được bỏ trống").nullable(),
    full_name: Yup.string().required("không được bỏ trống").nullable(),
    dob: Yup.string().required("không được bỏ trống").nullable(),
    // nameOrg: Yup.string().required("không được bỏ trống").nullable(),
    city: Yup.string().required("không được bỏ trống").nullable(),
    district: Yup.string().required("không được bỏ trống").nullable(),
    subDistrict: Yup.string().required("không được bỏ trống").nullable(),
    // adressString: Yup.string().required("không được bỏ trống").nullable(),
    groupsId: Yup.string().required("không được bỏ trống").nullable(),
    rePassWord: Yup.mixed().required("Xác minh mật khẩu").test("test", "Mật khẩu không khớp", function () {
        const { parent } = this;
        const { rePassWord, password } = parent;
        return rePassWord == password

    }),

});
