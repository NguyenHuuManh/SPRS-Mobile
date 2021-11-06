import * as Yup from "yup";

export const signinForm = Yup.object().shape({
    username: Yup.string().required("không được bỏ trống").nullable(),
    password: Yup.string().required("không được bỏ trống").nullable(),
});
