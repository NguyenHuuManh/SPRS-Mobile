import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import AwesomeLoading from 'react-native-awesome-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { apiOtpPassword } from '../../ApiFunction/Auth';
import ButtonCustom from "../../Components/ButtonCustom";
import Input from "../../Components/Input";
import { AppColor } from '../../Helper/propertyCSS';
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import { SubmitPhone } from './validate';
export default () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const getOtp = (values) => {
        console.log("values", values);
        apiOtpPassword(values).then((e) => {
            if (e.status == 200) {
                if (e.data.code == "200") {
                    navigation.navigate('ComfirmOTP', values);
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: e.data.message,
                    position: "top"
                });
                return;
            } else {
                Toast.show({
                    type: "error",
                    text1: 'Chức năng đang bảo trì',
                    position: "top"
                });
                return;
            }
        })
    }

    return (
        <>
            <Formik
                initialValues={{
                    to: ""
                }}
                validationSchema={SubmitPhone}
                onSubmit={(values) => {
                    getOtp({ to: "+84" + values.to.substring(1), });
                }}
            >
                {({ submitForm }) => (
                    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: AppColor.BUTTON_MAIN }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                        <AwesomeLoading indicatorId={16} size={50} isActive={loading} text="watting.." />
                        <ImageBackground source={require('../../Assets/Images/backdgroundpng.png')}
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
                                    name="to"
                                    iconLeft={faMobileAlt}
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    underLine
                                />

                                <ButtonCustom
                                    styleContain={{ backgroundColor: AppColor.BUTTON_MAIN, marginTop: "10%" }}
                                    styleTitle={{ color: "#FFFF", fontSize: 25 }}
                                    title="Tiếp tục"
                                    onPress={submitForm}
                                />
                            </View>

                        </ImageBackground>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        </>

    )
}