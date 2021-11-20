import * as Yup from "yup";

export const addBasket = Yup.object().shape({
    quantity: Yup.string().required("Nhập số lượng").nullable(),
    id: Yup.number().required("Chọn mặt hàng").nullable(),
});
