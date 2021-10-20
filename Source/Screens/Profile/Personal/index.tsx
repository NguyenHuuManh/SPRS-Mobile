import { useRoute } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import ButtonCustom from "../../../Components/ButtonCustom";
import HeaderContainer from "../../../Components/HeaderContainer";
import Input from "../../../Components/Input";
import { height, width } from "../../../Helper/responsive";
import styles from "../styles";
import { apiUpdate } from "../../../ApiFunction/Auth";
export default () => {
    const dispatch = useDispatch()
    const param = useRoute();
    const profile = param.params.profile
    console.log("param", profile)
    const upateProfile = (values) => {
        console.log("values", values)
        apiUpdate(profile.id, values).then((res) => { console.log("resonseUpate", res) })
    }
    const [isActive, setIsActive] = useState(false);
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "10%" }} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{
                    username: profile?.username || "",
                    password: profile?.password || "",
                    dob: profile?.dob || "",
                    accountType: profile?.username || "",
                    rePassWord: profile?.username || "",
                    full_name: profile?.full_name || "",
                }}
                onSubmit={(values) => {
                    upateProfile(values)
                }}
            >
                {({ submitForm }) => (
                    <View style={{ width: width, height: height, }}>
                        <View style={{ height: 5 }}>
                            <HeaderContainer isBack></HeaderContainer>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", zIndex: 100 }}>
                            <View style={[styles.avata, styles.boxShadowAvata]}></View>
                        </View>
                        {/* <TouchableOpacity style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 50, }} onPress={() => { setIsActive(!isActive) }}>
                            {isActive ? (
                                <Image source={require('../../../Assets/Images/sos.png')} resizeMode="contain" style={{ width: 50, height: 50, borderRadius: 50 }} />
                            ) : (
                                <Image source={require('../../../Assets/Images/sos1.png')} resizeMode="contain" style={{ width: 50, height: 50 }} />
                            )}
                        </TouchableOpacity> */}
                        <View style={{ flex: 6, backgroundColor: "#FFFF", padding: "5%", justifyContent: "space-around", paddingTop: "20%", paddingBottom: "10%" }}>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    name="full_name"
                                    title="Họ và tên:"
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Nhập họ tên"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    title="Tài khoản:"
                                    name="username"
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Nhập tài khoản"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    name="password"
                                    title="Mật khẩu:"
                                    secureTextEntry
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Nhập mật khẩu"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    title="Ngày sinh:"
                                    name="dob"
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Nhập ngày sinh"

                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field
                                    component={Input}
                                    name="accountType"
                                    title="Loại tài khoản:"
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Chọn loại tài khoản"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ButtonCustom title="Lưu" styleContain={{ backgroundColor: "#F6BB57" }} onPress={submitForm} />
                            </View>
                        </View>
                    </View>
                )}
            </Formik>

            {/* </View> */}
        </KeyboardAwareScrollView >
    );

}