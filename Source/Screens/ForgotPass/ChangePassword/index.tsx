import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonCustom from '../../../Components/ButtonCustom';
import Input from '../../../Components/Input';
import { MainStyle } from '../../../Style/main_style';
import styles from '../styles';
export default ({ navigation }) => {
    const OnchangePass = (values) => {
        navigation.navigate("Signin");
    }
    return (
        <Formik
            initialValues={{
                password: "",
                rePassword: "",
            }}
            onSubmit={(values) => {
                OnchangePass(values);
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "red", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
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
                                name="pasword"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập mật khẩu"

                            />
                            <Field
                                component={Input}
                                name="rePassword"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập lại mật khẩu"

                            />
                            <ButtonCustom
                                styleContain={{ backgroundColor: "#F6BB57", width: "80%", marginTop: "10%" }}
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