import React, { useState, useContext } from "react";
import { Button, ImageBackground, KeyboardAvoidingView, Text, TextInput, View } from "react-native";
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
import styles from "./styles";
import { RootState } from "../../Redux/Reducers";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const signin = (values) => {
        dispatch(userActions.loginReques(values));
    }

    return (
        <Formik
            initialValues={{
                username: "duongpt",
                password: "password"
            }}
            onSubmit={(values) => {
                // signin(values)
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "red", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." />
                    <ImageBackground source={require('../../Assets/Images/backdgroundpng.png')}
                        resizeMode="stretch"
                        style={[styles.BG]}
                    >
                        <View style={[MainStyle.boxShadow, styles.containLogin]}>
                            <Field
                                component={Input}
                                // title="Tài khoản:"
                                name="username"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập số điện thoại"

                            />
                            <Field
                                component={Input}
                                name="password"
                                // title="Mật khẩu:"
                                secureTextEntry
                                iconLeft={faLock}
                                placeholder="Nhập mật khẩu"
                            />

                            <ButtonCustom
                                styleContain={{ backgroundColor: "#F6BB57", width: "80%", marginTop: "10%" }}
                                styleTitle={{ color: "#FFFF", fontSize: 25 }}
                                title="Gửi"
                                onPress={submitForm}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: "5%" }}>
                                <Text style={{ textDecorationLine: "underline" }}>quên mật khẩu</Text>
                                <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.navigate("Signup") }}>đăng ký</Text>
                            </View>
                        </View>

                    </ImageBackground>
                </KeyboardAwareScrollView>

            )}
        </Formik>
    )
}