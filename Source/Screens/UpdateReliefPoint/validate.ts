import * as Yup from "yup";

export const update = Yup.object().shape({
    open_Date_time: Yup.string().required("không được bỏ trống").nullable(),
    open_Hour_time: Yup.string().required("không được bỏ trống").nullable(),
    close_Hour_time: Yup.string().required("không được bỏ trống").nullable(),
    close_Date_time: Yup.string().required("không được bỏ trống").nullable(),
    name: Yup.string().required("không được bỏ trống").nullable(),
});
