import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Field, Formik } from "formik";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { apiUpdatePass } from '../../ApiFunction/Auth';
import ButtonCustom from '../../Components/ButtonCustom';
import Input from '../../Components/Input';
import { MainStyle } from '../../Style/main_style';
import styles from './styles';
import { updatePass } from './validate';
export default ({ navigation }) => {
    const OnchangePass = (values) => {
        apiUpdatePass(values).then((e) => {
            console.log("e update P", e);
            if (e.status == 200) {
                if (e.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: e.data.description,
                        position: "top"
                    })
                } else {
                    Toast.show({
                        type: "error",
                        text1: e.data.message,
                        position: "top"
                    })
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: "Chức năng đang được bảo chì",
                    position: "top"
                })
            }
        })
    }
    return (
        <Formik
            initialValues={{
                oldPasword: "u3WvyfOA",
                newPassword: "",
                reNewPassword: "",
            }}
            validationSchema={updatePass}
            onSubmit={(values) => {
                const { reNewPassword, ...body } = values
                OnchangePass(body);
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    <ImageBackground source={require('../../Assets/Images/backdgroundpng.png')}
                        resizeMode="stretch"
                        style={[styles.BG]}
                    >
                        <View style={{ width: 30, height: 30, position: "absolute", top: 10, left: 10, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <FontAwesomeIcon size={26} color={"#FFF"} icon={faChevronLeft} />
                            </TouchableOpacity>
                        </View>

                        <View style={[MainStyle.boxShadow, styles.containLogin]}>
                            <Field
                                component={Input}
                                name="oldPasword"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập mật khẩu cũ"

                            />
                            <Field
                                component={Input}
                                name="newPassword"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập mật khẩu mới"

                            />
                            <Field
                                component={Input}
                                name="reNewPassword"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập lại mật khẩu mới"

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