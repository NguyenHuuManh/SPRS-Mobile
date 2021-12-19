import * as Yup from "yup";
import moment from 'moment';
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

export const update = Yup.object().shape({
    open_Hour_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Thời gian mở cửa phải nhỏ hơn thời gian đóng cửa", function () {
        const { parent } = this;
        const { open_Hour_time, close_Hour_time, open_Date_time, close_Date_time } = parent;
        if (moment(open_Date_time, "DD-MM-YYYY").isSame(moment(close_Date_time, "DD-MM-YYYY"))) {
            return compareTime(close_Hour_time, open_Hour_time);
        }
        return true;
    }),
    close_Hour_time: Yup.string().required("không được bỏ trống").nullable(),
    open_Date_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Ngày mở cửa phải nhỏ hơn ngày đóng cửa", function () {
        const { parent } = this;
        const { open_Date_time, close_Date_time } = parent;
        return moment(open_Date_time, "DD-MM-YYYY").isSameOrBefore(moment(close_Date_time, "DD-MM-YYYY"));
    }),
    close_Date_time: Yup.string().required("không được bỏ trống").nullable(),
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
