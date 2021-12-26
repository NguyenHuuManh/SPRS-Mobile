import { isEmpty } from "lodash";
import * as Yup from "yup";

export const SubmitPhone = Yup.object().shape({
    to: Yup.string().required("không được bỏ trống").nullable().nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { to } = parent;
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var checkNumber = /^[0-9]+$/
        return vnf_regex.test(to) && checkNumber.test(to);
    }),
});

export const SubmitOTP = Yup.object().shape({
    otp: Yup.string().required("Không được bỏ trống").nullable(),
});
