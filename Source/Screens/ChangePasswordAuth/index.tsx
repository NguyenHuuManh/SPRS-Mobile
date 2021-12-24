import { faChevronLeft, faEye, faEyeSlash, faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Field, Formik } from "formik";
import React, { useRef, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { apiUpdatePass } from '../../ApiFunction/Auth';
import ButtonCustom from '../../Components/ButtonCustom';
import Input from '../../Components/Input';
import { AppColor } from '../../Helper/propertyCSS';
import { MainStyle } from '../../Style/main_style';
import styles from './styles';
import { updatePass } from './validate';
export default ({ navigation }) => {
    const [newSecureTextEntry, setNewSecureTextEntry] = useState(true);
    const [oldSecureTextEntry, setOldSecureTextEntry] = useState(true);
    const [reSecureTextEntry, setReSecureTextEntry] = useState(true);
    const ref = useRef<any>()
    const OnchangePass = (values) => {
        apiUpdatePass(values).then((e) => {
            console.log("e update P", e);
            if (e.status == 200) {
                if (e.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: "Cập nhật mật khẩu thành công",
                        position: "top"
                    });
                    ref.current.resetForm();
                    navigation.goBack();
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
                    text1: "Chức năng đang được bảo trì",
                    position: "top"
                })
            }
        })
    }
    return (
        <Formik
            initialValues={{
                oldPassword: "",
                newPassword: "",
                reNewPassword: "",
            }}
            innerRef={ref}
            validationSchema={updatePass}
            onSubmit={(values) => {
                const { reNewPassword, ...body } = values
                OnchangePass(body);
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center", justifyContent: "center", backgroundColor: AppColor.BUTTON_MAIN }}>
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
                                name="oldPassword"
                                iconLeft={faLock}
                                iconRight={oldSecureTextEntry ? faEyeSlash : faEye}
                                placeholder="Nhập mật khẩu cũ"
                                underLine
                                type="password"
                                leftIconOnpress={() => { setOldSecureTextEntry(!oldSecureTextEntry) }}
                                secureTextEntry={oldSecureTextEntry}

                            />
                            <Field
                                component={Input}
                                name="newPassword"
                                secureTextEntry={newSecureTextEntry}
                                iconLeft={faLock}
                                iconRight={newSecureTextEntry ? faEyeSlash : faEye}
                                placeholder="Nhập mật khẩu mới"
                                leftIconOnpress={() => { setNewSecureTextEntry(!newSecureTextEntry) }}
                                underLine

                            />
                            <Field
                                component={Input}
                                name="reNewPassword"
                                secureTextEntry={reSecureTextEntry}
                                iconLeft={faLock}
                                iconRight={reSecureTextEntry ? faEyeSlash : faEye}
                                placeholder="Nhập lại mật khẩu mới"
                                leftIconOnpress={() => { setReSecureTextEntry(!reSecureTextEntry) }}
                                underLine
                                type="password"

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
    )
}