import { useNavigation } from "@react-navigation/native";
import { Field, Formik } from "formik";
import React from "react";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { apiPhoneVerify, apiSigup } from "../../ApiFunction/Auth";
import CountDown from "../../Components/AppCountDown";
import ContainerField from "../../Components/ContainerField";
import Input from "../../Components/Input";
import { AppColor } from "../../Helper/propertyCSS";
import { MainStyle } from "../../Style/main_style";
interface Props {
    visible: boolean,
    setVisible: any;
    body: any;
    timeStart: any,
    disableOTP: any,
    setDisableOTP: any,
    getOtp: any;
}
export default (props: Props) => {
    const { visible, setVisible, body, timeStart, disableOTP, setDisableOTP, getOtp } = props
    const navigation = useNavigation<any>();
    const signup = () => {
        try {
            apiSigup(body)
                .then((e) => {
                    console.log("res", e);
                    if (e.data.code + "" === "200") {
                        Toast.show({
                            type: "success",
                            text1: "Đăng ký tài khoản thành công",
                            position: "top"
                        });
                        setVisible(false);
                        navigation.navigate("Signin");
                    } else {
                        Toast.show({
                            type: "error",
                            text1: e.data.message,
                            position: "top"
                        })
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const otpVerify = (values) => {
        apiPhoneVerify(values).then((e) => {
            console.log(e, 'Verifi');
            if (e?.status == 200) {
                if (e?.data?.code == '200') {
                    signup();
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: e.data.message,
                    position: "top"
                })

            } else {
                Toast.show({
                    type: "error",
                    text1: 'Hệ thống đang bảo trì',
                    position: "top"
                })
            }
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View
                style={{
                    // position: 'absolute',
                    bottom: 0,
                    right: 0,
                    // backgroundColor: AppColor.BUTTON_MAIN,
                    width: '100%',
                    height: '100%',
                }}>
                <Formik
                    initialValues={{
                        to: '+84' + body?.phone?.substring(1),
                        message: "",
                        otp: "",
                        username: body?.username
                    }}
                    onSubmit={(values) => { otpVerify(values) }}
                >
                    {({ submitForm }) => (
                        <TouchableOpacity
                            // onPress={() => { setVisible(false) }}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(60, 60, 60,0)' }}>
                            <TouchableWithoutFeedback
                                onPress={(e) => { e.preventDefault() }}
                                style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, MainStyle.boxShadow]}>
                                <View style={{ maxHeight: "50%", width: "80%", minHeight: "20%", backgroundColor: '#f4f2f5', borderRadius: 10, paddingTop: 10 }}>
                                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                        <Text style={{ fontWeight: "bold" }}>Mã OTP</Text>
                                        <Text>Nhập mẫ OTP được gửi vào số điện thoại của bạn</Text>
                                    </View>
                                    <View style={{ paddingLeft: 20, paddingRight: 20, }}>
                                        <ContainerField styleCustomContainer={{ backgroundColor: "#FFFF", ustifyContent: "center", flexDirection: 'row' }}>
                                            <Field
                                                name="otp"
                                                component={Input}
                                                leftView={() => {
                                                    return (
                                                        <View style={{
                                                            flex: 3,
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            borderRightWidth: 1,
                                                            borderStyle: 'solid',
                                                            borderColor: "#e0dcce",
                                                        }}>
                                                            {timeStart && (
                                                                <CountDown
                                                                    minuteStart={timeStart}
                                                                    onClick={() => {
                                                                        getOtp(body);
                                                                    }}
                                                                    onStop={() => setDisableOTP(true)}
                                                                />
                                                            )}
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </ContainerField>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "flex-end", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 10 }}>
                                        <View style={{ borderStyle: 'solid', borderRightWidth: 0.5, flex: 1, alignItems: "center", height: 40, justifyContent: "center", borderTopWidth: 0.5, borderColor: AppColor.CORLOR_TEXT }}>
                                            <TouchableOpacity onPress={() => { setVisible(false) }}><Text>Hủy</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", height: 40, borderStyle: 'solid', borderColor: AppColor.CORLOR_TEXT, borderTopWidth: 0.5, justifyContent: "center" }}>
                                            <TouchableOpacity onPress={submitForm} disabled={disableOTP}><Text>Gửi</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    )}
                </Formik>

            </View>
        </Modal >
    )
}