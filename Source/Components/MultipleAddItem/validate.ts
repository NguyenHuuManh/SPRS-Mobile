import * as Yup from "yup";

export const addBasket = Yup.object().shape({
    quantity: Yup.string().required("Nhập số lượng").nullable()
        .test('checkQuantity', "Chỉ nhập số", function () {
            const { parent } = this;
            const { quantity } = parent;
            var checkNumber = /^[0-9]+$/
            return checkNumber.test(quantity);
        }),
    id: Yup.number().required("Chọn mặt hàng").nullable(),
});
