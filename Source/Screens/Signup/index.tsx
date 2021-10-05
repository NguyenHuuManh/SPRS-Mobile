import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import AwesomeLoading from 'react-native-awesome-loading';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { apiSigup } from "../../ApiFunction/Auth";
import ButtonCustom from "../../Components/ButtonCustom";
import DateTimePicker from "../../Components/DateTimePicker";
import DropDownPicker from "../../Components/DropDownPicker";
import Input from "../../Components/Input";
import { toastActions } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducers";
import httpServices from "../../Services/httpServices";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [toastProps, setToastProps] = useState({
        visible: false,
        message: "",
        type: "success"
    })
    const signup = () => {
        try {
            apiSigup({ username: "manh19999", password: "spring123", phoneNumber: "0169760397911" })
                .then((e) => {
                    console.log(e, "response");
                    httpServices.saveLocalStorage("user", e.data);
                }).finally(() => { })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Formik
            initialValues={{
                username: "",
                passWord: "",
                birdthDate: "09-08-1999",
                accountType: "",
                rePassWord: "",
                name: "",
            }}
            onSubmit={(values) => {
                Toast.show({
                    type: "error",
                    text1: "Helloooooo",
                    position: "top"
                })
                // navigation.navigate("Signin")
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "10%" }} showsVerticalScrollIndicator={false}>
                    <View style={[MainStyle.boxShadow, styles.containLogin]}>
                        <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." />
                        <Field
                            component={Input}
                            // title="Tài khoản:"
                            name="fullName"
                            // iconLeft={faMobileAlt}
                            placeholder="Nhập họ và tên"
                            title="Họ và tên"
                            horizontal
                            styleTitle={{ width: 90 }}
                        />
                        <Field
                            component={Input}
                            keyboardType="numeric"
                            name="phoneNumber"
                            title="Số điện thoại"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Nhập số điện thoại"
                            max
                        />

                        <Field
                            component={DateTimePicker}
                            title="Ngày sinh"
                            horizontal
                            styleTitle={{ width: 90 }}
                            name="birdthDate"
                            placeholder="Nhập ngày sinh"

                        />

                        <Field
                            component={DropDownPicker}
                            name="accountType"
                            title="Loại tài khoản"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Chọn loại tài khoản"
                        />
                        <Field
                            component={Input}
                            name="password"
                            title="Mật khẩu"
                            horizontal
                            styleTitle={{ width: 90 }}
                            secureTextEntry
                            placeholder="Nhập mật khẩu"
                        />
                        <Field
                            component={Input}
                            title="Nhập lại mật khẩu"
                            horizontal
                            styleTitle={{ width: 90 }}
                            secureTextEntry
                            name="rePassWord"
                            placeholder="Nhập lại mật khẩu"

                        />
                        <ButtonCustom
                            styleContain={{ backgroundColor: "#F6BB57", width: "80%", marginTop: "10%" }}
                            styleTitle={{ color: "#FFFF", fontSize: 25 }}
                            title="Đăng ký"
                            onPress={submitForm}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: "5%" }}>
                            <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.goBack() }}>đăng nhập</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            )
            }
        </Formik >
    )
}