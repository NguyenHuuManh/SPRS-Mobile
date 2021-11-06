import * as Yup from "yup";

export const register = Yup.object().shape({
    open_time: Yup.string().required("không được bỏ trống").nullable(),
    close_time: Yup.string().required("không được bỏ trống").nullable(),
    name: Yup.string().required("không được bỏ trống").nullable(),
});
