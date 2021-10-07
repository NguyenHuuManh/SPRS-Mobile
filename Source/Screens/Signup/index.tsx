import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const signup = (body) => {
        try {
            apiSigup(body)
                .then((e) => {
                    if (e.data.code + "" === "101") {
                        Toast.show({
                            type: "success",
                            text1: e.data.description,
                            position: "top"
                        })
                        navigation.navigate("Signin")
                    } else {
                        Toast.show({
                            type: "error",
                            text1: e.data.errors,
                            position: "top"
                        })
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Formik
            initialValues={{
                username: "Duongpt35",
                phone: "0966048002",
                password: "password",
                rePassWord: "password",
                full_name: "Phạm Tùng Dương",
                dob: "09/09/1999",
                address: "Ha noi",
                groupsId: "1",
            }}
            onSubmit={(values) => {
                const body = {
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    full_name: values.full_name,
                    dob: values.dob,
                    address: values.address,
                    groups_user: [{ id: values.groupsId }],
                }
                signup(body)
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "10%" }} showsVerticalScrollIndicator={false}>
                    <View style={[MainStyle.boxShadow, styles.containLogin]}>
                        {/* <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." /> */}
                        <Field
                            component={Input}
                            name="username"
                            placeholder="Nhập tên tài khoản"
                            title="Tên tài khoản"
                            horizontal
                            styleTitle={{ width: 90 }}
                        />
                        <Field
                            component={Input}
                            name="full_name"
                            placeholder="Nhập họ và tên"
                            title="Họ và tên"
                            horizontal
                            styleTitle={{ width: 90 }}
                        />
                        <Field
                            component={Input}
                            keyboardType="numeric"
                            name="phone"
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
                            name="dob"
                            placeholder="Nhập ngày sinh"

                        />

                        <Field
                            component={DropDownPicker}
                            name="groupsId"
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
                            secureTextEntry={secureTextEntry}
                            iconRight={secureTextEntry ? faEyeSlash : faEye}
                            leftIconOnpress={() => { setSecureTextEntry(!secureTextEntry) }}
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