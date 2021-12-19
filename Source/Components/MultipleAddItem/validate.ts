import * as Yup from "yup";

export const addBasket = Yup.object().shape({
    quantity: Yup.string().required("Nhập số lượng").nullable()
        .test('checkQuantity', "Chỉ nhập số > 0", function () {
            const { parent } = this;
            const { quantity } = parent;
            var checkNumber = /^[0-9]+$/
            if (checkNumber.test(quantity)) {
                if (Number(quantity) <= 0) return false;
            }
            return checkNumber.test(quantity);
        }),
    id: Yup.number().required("Chọn mặt hàng").nullable(),
});
