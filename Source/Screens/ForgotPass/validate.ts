import { isEmpty } from "lodash";
import * as Yup from "yup";

export const SubmitPhone = Yup.object().shape({
    to: Yup.string().required("không được bỏ trống").nullable(),
});

export const SubmitOTP = Yup.object().shape({
    otp: Yup.string().required("không được bỏ trống").nullable(),
});
