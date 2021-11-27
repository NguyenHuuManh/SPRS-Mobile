import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import AwesomeLoading from 'react-native-awesome-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { apiOtpPassword } from '../../ApiFunction/Auth';
import ButtonCustom from "../../Components/ButtonCustom";
import Input from "../../Components/Input";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import { SubmitPhone } from './validate';
import CountDown from 'react-native-countdown-component';
export default () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const getOtp = (values) => {
        console.log("values", values);
        apiOtpPassword(values).then((e) => {
            console.log("e", e);
            if (e.status == 200 && e.data.code == "200") {
                navigation.navigate('ComfirmOTP', values);
            }
        })
    }

    return (
        <Formik
            initialValues={{
                to: "966048002"
            }}
            validationSchema={SubmitPhone}
            onSubmit={(values) => {
                getOtp({ to: "+84" + values.to })
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "red", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
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
                                keyboardType="phone-pad"
                                textContentType='telephoneNumber'
                                dataDetectorTypes='phoneNumber'
                                maxLength={9}
                                underLine
                            />

                            <ButtonCustom
                                styleContain={{ backgroundColor: "#F6BB57", marginTop: "10%" }}
                                styleTitle={{ color: "#FFFF", fontSize: 25 }}
                                title="Tiếp tục"
                                onPress={submitForm}
                            />
                        </View>

                    </ImageBackground>
                </KeyboardAwareScrollView>

            )}
        </Formik>
    )
}