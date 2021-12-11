import * as Yup from "yup";


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

export const createStore = Yup.object().shape({
    open_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Giờ mở cửa phải nhỏ hơn giờ đóng cửa", function () {
        const { parent } = this;
        const { open_time, close_time } = parent;
        return compareTime(close_time + '', open_time + '');
    }),
    close_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Giờ đóng cửa phải lớn hơn giờ mở cửa", function () {
        const { parent } = this;
        const { open_time, close_time } = parent;
        return compareTime(close_time + '', open_time + '');
    }),
    name: Yup.string().required("không được bỏ trống").nullable(),
});
