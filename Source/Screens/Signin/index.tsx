import { faLock, faMobileAlt, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import AwesomeLoading from 'react-native-awesome-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "../../Components/ButtonCustom";
import Input from "../../Components/Input";
import { userActions } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                username: "Duongpt00",
                password: "password"
            }}
            onSubmit={(values) => {
                signin(values)
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "red", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    {/* <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." /> */}
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

                            />
                            <Field
                                component={Input}
                                name="password"
                                secureTextEntry={secureTextEntry}
                                iconLeft={faLock}
                                iconRight={secureTextEntry ? faEyeSlash : faEye}
                                placeholder="Nhập mật khẩu"
                                leftIconOnpress={() => { setSecureTextEntry(!secureTextEntry) }}
                            />

                            <ButtonCustom
                                styleContain={{ backgroundColor: "#F6BB57", width: "80%", marginTop: "10%" }}
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