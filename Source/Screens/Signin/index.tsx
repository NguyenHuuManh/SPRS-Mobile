import { faEye, faEyeSlash, faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "../../Components/ButtonCustom";
import Input from "../../Components/Input";
import Loading from '../../Components/Loading';
import { userActions } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import { signinForm } from './validate';
export default () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const signin = (values) => {
        dispatch(userActions.loginReques(values));
    }

    return (
        <Formik
            initialValues={{
                username: "manh_user",
                password: "password123"
            }}
            validationSchema={signinForm}
            onSubmit={(values) => {
                signin(values)
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "red", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    <Loading isVisible={userReducer.isLoading} />
                    <ImageBackground source={require('../../Assets/Images/backdgroundpng.png')}
                        resizeMode="stretch"
                        style={[styles.BG]}
                    >
                        <View style={[MainStyle.boxShadow, styles.containLogin]}>
                            <Field
                                component={Input}
                                name="username"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập tài khoản"
                                underLine

                            />
                            <Field
                                component={Input}
                                name="password"
                                secureTextEntry={secureTextEntry}
                                iconLeft={faLock}
                                iconRight={secureTextEntry ? faEyeSlash : faEye}
                                placeholder="Nhập mật khẩu"
                                leftIconOnpress={() => { setSecureTextEntry(!secureTextEntry) }}
                                underLine
                            />
                            <ButtonCustom
                                styleContain={{ backgroundColor: "#F6BB57", marginTop: "10%" }}
                                styleTitle={{ color: "#FFFF", fontSize: 25 }}
                                title="Đăng nhập"
                                onPress={submitForm}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: "5%" }}>
                                <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.navigate("ForgotPass") }}>quên mật khẩu</Text>
                                <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.navigate("Signup") }}>đăng ký</Text>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: "10%" }}>
                                <TouchableOpacity>
                                    <Text style={{ textDecorationLine: "underline", color: "blue" }} onPress={() => {
                                        dispatch(userActions.loginGuest())
                                        navigation.navigate("GuestStackScreen")
                                    }}>Truy cập không cần đăng nhập</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ImageBackground>
                </KeyboardAwareScrollView>

            )}
        </Formik>
    )
}