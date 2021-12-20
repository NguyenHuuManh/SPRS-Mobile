import * as Yup from "yup";

export const sosUpdate = Yup.object().shape({
    level: Yup.string().required("không được bỏ trống").nullable(),
});
