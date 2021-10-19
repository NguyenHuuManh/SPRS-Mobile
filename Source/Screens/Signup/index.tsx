import { faEye, faEyeSlash, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiSigup } from "../../ApiFunction/Auth";
import ButtonCustom from "../../Components/ButtonCustom";
import DateTimePicker from "../../Components/DateTimePicker";
import DropDownPicker from "../../Components/DropDownPicker";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const navigation = useNavigation();
    const [organizationInfor, setOrganizationInfor] = useState<{
        city: string,
        province: string,
        district: string,
        subDistrict: string,
        addressLine: string,
        GPS_Long: string,
        GPS_Lati: string,
    }>({
        city: "",
        province: "",
        district: "",
        subDistrict: "",
        addressLine: "",
        GPS_Long: "",
        GPS_Lati: "",
    });
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const signup = (body) => {
        const param = { ...body }

        console.log("param", param);

        try {
            apiSigup(param)
                .then((e) => {
                    console.log("res", e);
                    if (e.data.code + "" === "200") {
                        Toast.show({
                            type: "success",
                            text1: e.data.description,
                            position: "top"
                        })
                        navigation.navigate("Signin")
                    } else {
                        Toast.show({
                            type: "error",
                            text1: e.data.errors,
                            position: "top"
                        })
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Formik
            initialValues={{
                username: "manhhe",
                phone: "0966048002",
                password: "password",
                rePassWord: "password",
                full_name: "Nguyễn Hữu Mạnh",
                dob: "09/09/1999",
                city: "",
                province: "",
                district: "",
                subDistrict: "",
                addressLine: "",
                groupsId: "1",
                adresslineORG: "",

            }}
            onSubmit={(values) => {
                let user = {
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                    full_name: values.full_name,
                    dob: values.dob,
                    address: {
                        city: values.city || "",
                        province: values?.province || "",
                        district: values?.district || "",
                        subDistrict: values?.subDistrict || "",
                        addressLine: values?.addressLine || "",
                    },
                    groups_user: [{ id: values.groupsId }],
                    organization: {}
                }
                if (values.groupsId + "" == "4") {
                    user.organization = {
                        name: "",
                        founded: "",
                        description: "",
                        address: {
                            city: organizationInfor.city || "",
                            province: organizationInfor?.province || "",
                            district: organizationInfor?.district || "",
                            subDistrict: organizationInfor?.subDistrict || "",
                            addressLine: organizationInfor?.addressLine || "",
                        }

                    }
                }
                if (values.groupsId + "" !== "4") {
                    delete user.organization
                }
                signup(user);

            }
            }
        >
            {({ submitForm, values }) => (
                <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "5%" }} showsVerticalScrollIndicator={false}>
                    <View style={[MainStyle.boxShadow, styles.containLogin]}>
                        {/* <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." /> */}
                        <Field
                            component={DropDownPicker}
                            name="groupsId"
                            title="Loại tài khoản"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Chọn loại tài khoản"
                        />
                        <Field
                            component={Input}
                            name="username"
                            placeholder="Nhập tên tài khoản"
                            title="Tên tài khoản"
                            horizontal
                            styleTitle={{ width: 90 }}
                        />
                        <Field
                            component={Input}
                            name="full_name"
                            placeholder="Nhập họ và tên"
                            title="Họ và tên"
                            horizontal
                            styleTitle={{ width: 90 }}
                        />
                        <Field
                            component={Input}
                            keyboardType="numeric"
                            name="phone"
                            title="Số điện thoại"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Nhập số điện thoại"
                        />

                        <Field
                            component={DateTimePicker}
                            title="Ngày sinh"
                            horizontal
                            styleTitle={{ width: 90 }}
                            name="dob"
                            placeholder="Nhập ngày sinh"
                        />
                        <Field
                            component={Input}
                            name="city"
                            title="Tỉnh/Thành phố"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Tỉnh/Thành phố"
                        />
                        <Field
                            component={Input}
                            name="district"
                            title="Quận/Huyện"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Quận/Huyện"
                        />
                        <Field
                            component={Input}
                            name="subDistrict"
                            title="Xã/Phường"
                            horizontal
                            styleTitle={{ width: 90 }}
                            placeholder="Xã/Phường"
                        />
                        {
                            values.groupsId == "4" && (
                                <>
                                    <MapPicker
                                        title="Địa điểm tổ chức"
                                        styleTitle={{ width: 90 }}
                                        horizontal
                                        iconRight={faMapMarkedAlt}
                                        iconSize={20}
                                        setAdress={setOrganizationInfor}
                                        adress={organizationInfor}
                                    />
                                    <Field
                                        component={Input}
                                        name="adresslineORG"
                                        title="Địa chỉ chi tiết tổ chức"
                                        horizontal
                                        styleTitle={{ width: 90 }}
                                        placeholder="Địa chỉ chi tiết tổ chức"
                                    />
                                </>

                            )
                        }
                        <Field
                            component={Input}
                            name="password"
                            title="Mật khẩu"
                            horizontal
                            styleTitle={{ width: 90 }}
                            secureTextEntry={secureTextEntry}
                            iconRight={secureTextEntry ? faEyeSlash : faEye}
                            leftIconOnpress={() => { setSecureTextEntry(!secureTextEntry) }}
                            placeholder="Nhập mật khẩu"
                            iconSize={20}
                        />
                        <Field
                            component={Input}
                            title="Nhập lại mật khẩu"
                            horizontal
                            styleTitle={{ width: 90 }}
                            secureTextEntry
                            name="rePassWord"
                            placeholder="Nhập lại mật khẩu"
                        />
                        <ButtonCustom
                            styleContain={{ backgroundColor: "#F6BB57", width: "80%", marginTop: "10%" }}
                            styleTitle={{ color: "#FFFF", fontSize: 25 }}
                            title="Đăng ký"
                            onPress={submitForm}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: "5%" }}>
                            <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.goBack() }}>đăng nhập</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            )
            }
        </Formik >
    )
}