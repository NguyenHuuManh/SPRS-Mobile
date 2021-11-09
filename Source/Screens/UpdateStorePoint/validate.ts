import { isEmpty } from "lodash";
import * as Yup from "yup";

export const updateStore = Yup.object().shape({
    open_time: Yup.string().required("không được bỏ trống").nullable(),
    close_time: Yup.string().required("không được bỏ trống").nullable(),
    name: Yup.string().required("không được bỏ trống").nullable(),
});
