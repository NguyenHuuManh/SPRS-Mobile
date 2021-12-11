import { isEmpty } from "lodash";
import * as Yup from "yup";

export const updatePass = Yup.object().shape({
    oldPassword: Yup.string().required("Mật khẩu không được để trống"),
    newPassword: Yup.string().required("Mật khẩu mới không được để trống")
        .test('checkSpace', "Mật khẩu không chứa khoảng trắng", function () {
            const { parent } = this;
            const { newPassword } = parent;
            const regex = /\s/;
            return !regex.test(newPassword);
        })
        .test("test", "Mật khẩu phải có cả chữ, sô, kí tự đặc biệt và tối thiểu 8 kí tự", function () {
            const { parent } = this;
            const { newPassword } = parent;

            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            return regex.test(newPassword)
        }),
    reNewPassword: Yup.mixed().required("Xác minh mật khẩu").test("test", "Mật khẩu không khớp", function () {
        const { parent } = this;
        const { reNewPassword, newPassword } = parent;
        return reNewPassword == newPassword
    }),

});
