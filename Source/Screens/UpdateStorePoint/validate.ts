import * as Yup from "yup";
import { removeAscent } from "../../Helper/FunctionCommon";


function compareTime(str1, str2) {
    if (str1 === str2) {
        return false;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if (eval(time1[0]) > eval(time2[0])) {
        return true;
    } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return true;
    } else {
        return false;
    }
}

export const updateStore = Yup.object().shape({
    open_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Giờ mở cửa phải nhỏ hơn giờ đóng cửa", function () {
        const { parent } = this;
        const { open_time, close_time } = parent;
        return compareTime(close_time, open_time);
    }),
    close_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Giờ đóng cửa phải lớn hơn giờ mở cửa", function () {
        const { parent } = this;
        const { open_time, close_time } = parent;
        return compareTime(close_time, open_time);
    }),
    name: Yup.string().required("không được bỏ trống").nullable()
        .test("test", "Tên cửa hàng không chứa kí tự đặc biệt, 2 khoảng trắng liên tục và độ dài tối đa 100 kí tự", function () {
            const { parent } = this;
            const { name } = parent;
            const nameStrim = removeAscent(name);
            if (name?.length > 100) return;
            let regex = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)+$/
            let regex1 = /^[\w]*$/
            // console.log('regex' + regex, regex.test(nameStrim?.trim()))
            // console.log('regex1' + regex1, regex1.test(nameStrim?.trim()))
            return regex.test(nameStrim?.trim()) || regex1.test(nameStrim?.trim());
        }),
});
