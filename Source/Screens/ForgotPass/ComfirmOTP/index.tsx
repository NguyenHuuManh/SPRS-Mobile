import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { apiOtpPassword, apiResetPass } from '../../../ApiFunction/Auth';
import CountDown from '../../../Components/AppCountDown';
import ButtonCustom from '../../../Components/ButtonCustom';
import Input from '../../../Components/Input';
import { AppColor } from '../../../Helper/propertyCSS';
import { MainStyle } from '../../../Style/main_style';
import styles from '../styles';
import { SubmitOTP } from '../validate';

export default ({ route, navigation }) => {
    const { to } = route.params;
    const [timeStart, setTimeStart] = useState<any>({ value: 1 });
    const [disableOTP, setDisableOTP] = useState(false);

    const getOtp = (values) => {
        apiOtpPassword(values).then((e) => {
            console.log("e", e);
            if (e.status == 200 && e.data.code == "200") {
                setTimeStart({ value: 1 });
                setDisableOTP(false)
            }
        })
    }

    const checkOTP = (values) => {
        apiResetPass(values).then((res) => {
            if (res.status == 200) {
                if (res.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: "Cấp lại mật khẩu thành",
                        text2: "Mật khẩu mới được gửi vào số điện thoại bạn",
                        position: "top"
                    })
                    navigation.navigate("Signin");
                } else {
                    Toast.show({
                        type: "error",
                        text1: res?.data?.description,
                        position: "top"
                    })
                }
            }
        })
    }

    return (
        <Formik
            initialValues={{
                otp: ""
            }}
            validationSchema={SubmitOTP}
            onSubmit={(values) => {
                checkOTP({ otp: values.otp, to: to })
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: AppColor.BUTTON_MAIN, }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    <ImageBackground source={require('../../../Assets/Images/backdgroundpng.png')}
                        resizeMode="stretch"
                        style={[styles.BG]}
                    >
                        <View style={{ width: 30, height: 30, position: "absolute", top: 10, left: 10 }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <FontAwesomeIcon size={26} color={"#FFF"} icon={faChevronLeft} />
                            </TouchableOpacity>
                        </View>
                        <View style={[MainStyle.boxShadow, styles.containLogin]}>
                            <Field
                                component={Input}
                                name="otp"
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
                                                        getOtp({ to: to, platform: 2 });
                                                    }}
                                                    onStop={() => setDisableOTP(true)}
                                                />
                                            )}
                                        </View>
                                    )
                                }}
                                placeholder="Nhập mã otp"
                                keyboardType="numeric"
                                underLine
                            />

                            <ButtonCustom
                                styleContain={{ backgroundColor: AppColor.BUTTON_MAIN, marginTop: "10%" }}
                                styleTitle={{ color: "#FFFF", fontSize: 25 }}
                                title="Tiếp tục"
                                disabled={disableOTP}
                                onPress={submitForm}
                            />
                        </View>

                    </ImageBackground>
                </KeyboardAwareScrollView>

            )}
        </Formik>
    )
}