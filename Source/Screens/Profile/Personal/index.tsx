import { useRoute } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "../../../Components/ButtonCustom";
import HeaderContainer from "../../../Components/HeaderContainer";
import Input from "../../../Components/Input";
import { height, width } from "../../../Helper/responsive";
import styles from "../styles";
import { apiUpdate } from "../../../ApiFunction/Auth";
import AppSelectTinh from "../../../Components/AppSelectTinh";
import AppSelectHuyen from "../../../Components/AppSelectHuyen";
import AppSelectXa from "../../../Components/AppSelectXa";
import AppSelectAccount from "../../../Components/AppSelectAccount";
import DateTimePicker from "../../../Components/DateTimePicker";
export default () => {
    const dispatch = useDispatch()
    const param = useRoute<any>();
    const profile = param?.params?.profile
    const upateProfile = (values) => {
        console.log("values", values)
        apiUpdate(profile.id, values).then((res) => { console.log("resonseUpate", res) })
    }
    const [idTinh, setIdTinh] = useState("");
    const [idHuyen, setIdHuyen] = useState("");
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "10%" }} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{
                    username: profile?.username || "",
                    dob: profile?.dob || "",
                    groupsId: profile?.groups_user[0].id || "",
                    full_name: profile?.full_name || "",
                    phone: profile?.phone || "",
                    city: profile?.address?.city?.id,
                    district: profile?.address?.district?.id,
                    subDistrict: profile?.address?.subDistrict?.id,
                    addressLine: "",
                }}
                onSubmit={(values) => {
                    const { city, district, subDistrict, addressLine, groupsId, ...body } = values

                    const dataBody = {
                        ...body,
                        address: {
                            city: {
                                code: "",
                                id: values.city,
                                name: ""
                            },
                            district: {
                                code: "",
                                id: values?.district,
                                name: ""
                            },
                            subDistrict: {
                                code: "",
                                id: values?.subDistrict,
                                name: "",
                            },
                            addressLine: values?.addressLine,
                        },
                        groups_user: [{ id: groupsId }]
                    }
                    upateProfile(dataBody)
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
                        <View style={{ flex: 6, backgroundColor: "#FFFF", padding: "5%", justifyContent: "space-around", paddingTop: "20%", paddingBottom: "10%" }}>
                            <Field
                                component={AppSelectAccount}
                                name="groupsId"
                                // title="Loại tài khoản"
                                disabled
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Chọn loại tài khoản"
                            />
                            <Field
                                component={Input}
                                name="username"
                                placeholder="Nhập tên tài khoản"
                                // title="Tên tài khoản"
                                horizontal
                                styleTitle={{ width: 90 }}
                            />
                            <Field
                                component={Input}
                                name="full_name"
                                placeholder="Nhập họ và tên"
                                // title="Họ và tên"
                                horizontal
                                styleTitle={{ width: 90 }}
                            />
                            <Field
                                component={Input}
                                keyboardType="numeric"
                                name="phone"
                                // title="Số điện thoại"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Nhập số điện thoại"
                            />

                            <Field
                                component={DateTimePicker}
                                // title="Ngày sinh"
                                horizontal
                                styleTitle={{ width: 90 }}
                                name="dob"
                                placeholder="Nhập ngày sinh"
                            />
                            <Field
                                component={AppSelectTinh}
                                name="city"
                                // title="Tỉnh/Thành phố"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Tỉnh/Thành phố"
                                onSelectOption={(item) => { setIdTinh(item?.id) }}
                                defaultValue
                            />
                            <Field
                                component={AppSelectHuyen}
                                name="district"
                                // title="Quận/Huyện"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Quận/Huyện"
                                idTinh={idTinh}
                                onSelectOption={(item) => { setIdHuyen(item?.id) }}
                                defaultValue
                            />
                            <Field
                                component={AppSelectXa}
                                name="subDistrict"
                                // title="Quận/Huyện"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Quận/Huyện"
                                idHuyen={idHuyen}
                                defaultValue
                            />
                            <ButtonCustom title="Lưu" styleContain={{ backgroundColor: "#F6BB57", marginTop: 10 }} onPress={submitForm} />
                        </View>
                    </View>
                )}
            </Formik>

            {/* </View> */}
        </KeyboardAwareScrollView >
    );

}