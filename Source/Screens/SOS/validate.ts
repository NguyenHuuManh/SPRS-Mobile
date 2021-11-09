import * as Yup from "yup";

export const register = Yup.object().shape({
    name: Yup.string().required("không được bỏ trống").nullable(),
});
