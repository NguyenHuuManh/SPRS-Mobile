import * as Yup from "yup";

export const addBasket = Yup.object().shape({
    id: Yup.number().required("Chọn mặt hàng").nullable(),
});
