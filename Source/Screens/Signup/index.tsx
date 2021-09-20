import React from "react";
import { Button, ImageBackground, ScrollView, Text, TextInput, View } from "react-native";
import { apiSignin, apiSigup } from "../../ApiFunction/Auth";
import httpServices from "../../Services/httpServices";
import { userActions } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import Input from "../../Components/Input";
import ButtonCustom from "../../Components/ButtonCustom";
import AwesomeLoading from 'react-native-awesome-loading';
import { MainStyle } from "../../Style/main_style";
import { faMobileAlt, faLock } from '@fortawesome/free-solid-svg-icons'
import { RootState } from "../../Redux/Reducers";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const navigation = useNavigation();
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
                birdthDate: "",
                accountType: "",
                rePassWord: "",
                name: "",
            }}
            onSubmit={(values) => {
                signup(values)
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#F6BB57", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center", paddingTop: "10%" }}>
                    {/* <ImageBackground source={require('../../Assets/Images/backdgroundpng.png')}
                        resizeMode="stretch"
                        style={[styles.BG]}
                    > */}
                    <View style={[MainStyle.boxShadow, styles.containLogin]}>
                        <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." />
                        <Field
                            component={Input}
                            // title="Tài khoản:"
                            name="username"
                            iconLeft={faMobileAlt}
                            placeholder="Nhập tài khoản"
                        />
                        <Field
                            component={Input}
                            name="passWord"
                            // title="Mật khẩu:"
                            secureTextEntry
                            iconLeft={faLock}
                            placeholder="Nhập mật khẩu"
                        />

                        <Field
                            component={Input}
                            // title="Tài khoản:"
                            name="birdthDate"
                            iconLeft={faMobileAlt}
                            placeholder="Nhập ngày sinh"

                        />

                        <Field
                            component={Input}
                            name="accountType"
                            // title="Mật khẩu:"
                            secureTextEntry
                            iconLeft={faLock}
                            placeholder="Chọn loại tài khoản"
                        />
                        <Field
                            component={Input}
                            // title="Tài khoản:"
                            name="rePassWord"
                            iconLeft={faMobileAlt}
                            placeholder="Nhập lại mật khẩu"

                        />
                        <Field
                            component={Input}
                            name="name"
                            // title="Mật khẩu:"
                            secureTextEntry
                            iconLeft={faLock}
                            placeholder="Nhập họ tên"
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

                    {/* </ImageBackground> */}
                </KeyboardAwareScrollView>


            )
            }
        </Formik >
    )
}