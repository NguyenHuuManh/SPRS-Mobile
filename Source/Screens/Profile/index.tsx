import { faLock, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Field, Formik } from "formik";
import React from "react";
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import ButtonCustom from "../../Components/ButtonCustom";
import Input from "../../Components/Input";
import { height, width } from "../../Helper/responsive";
import { logout } from "../../Redux/Actions/UserActions";
import styles from "./styles";
export default () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const signout = () => {
        dispatch(logout());
    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "10%" }} showsVerticalScrollIndicator={false}>
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
                {({ }) => (
                    <View style={{ width: width, height: height, }}>
                        <View style={{ flex: 1, alignItems: "center", zIndex: 100 }}>
                            <View style={[styles.avata, styles.boxShadowAvata]}></View>
                        </View>
                        <View style={{ flex: 6, backgroundColor: "#FFFF", paddingRight: "5%", justifyContent: "space-around", paddingTop: "30%", paddingBottom: "10%" }}>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    // title="Tài khoản:"
                                    name="username"
                                    iconLeft={faMobileAlt}
                                    placeholder="Nhập tài khoản"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    name="passWord"
                                    // title="Mật khẩu:"
                                    secureTextEntry
                                    iconLeft={faLock}
                                    placeholder="Nhập mật khẩu"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    // title="Tài khoản:"
                                    name="birdthDate"
                                    iconLeft={faMobileAlt}
                                    placeholder="Nhập ngày sinh"

                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    name="accountType"
                                    // title="Mật khẩu:"
                                    secureTextEntry
                                    iconLeft={faLock}
                                    placeholder="Chọn loại tài khoản"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    // title="Tài khoản:"
                                    name="rePassWord"
                                    iconLeft={faMobileAlt}
                                    placeholder="Nhập lại mật khẩu"

                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    name="name"
                                    // title="Mật khẩu:"
                                    secureTextEntry
                                    iconLeft={faLock}
                                    placeholder="Nhập họ tên"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ButtonCustom title={"Logout"} styleContain={{ backgroundColor: "#F6BB57" }} onPress={signout} />
                            </View>
                        </View>
                    </View>
                )}
            </Formik>

            {/* </View> */}
        </KeyboardAwareScrollView>
    );

}