import { faCalendar, faCity, faEdit, faPhone, faUserAlt, faUserCircle, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/core";
import { Field, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdate } from "../../../ApiFunction/Auth";
import AppSelectGroupUser from "../../../Components/AppSelectGroupUser";
import AppSelectHuyen from "../../../Components/AppSelectHuyen";
import AppSelectTinh from "../../../Components/AppSelectTinh";
import AppSelectXa from "../../../Components/AppSelectXa";
import ButtonCustom from "../../../Components/ButtonCustom";
import ContainerField from "../../../Components/ContainerField";
import DateTimePicker from "../../../Components/DateTimePicker";
import HeaderContainer from "../../../Components/HeaderContainer";
import Input from "../../../Components/Input";
import { AppColor } from "../../../Helper/propertyCSS";
import { height, width } from "../../../Helper/responsive";
import { profileActions } from "../../../Redux/Actions";
import styles from "../styles";
import { updateForm } from "../validate";
export default () => {
    const dispatch = useDispatch()
    const param = useRoute<any>();
    // const profile = param?.params?.profile
    const [idTinh, setIdTinh] = useState("");
    const [idHuyen, setIdHuyen] = useState("");
    const [disable, setDisable] = useState(true);
    const profile = useSelector((state) => state.profileReducer);
    const upateProfile = (values) => {
        apiUpdate(values).then((res) => {
            if (res.status == 200) {
                if (res.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: "Cập nhật thông tin thành công",
                        position: "top"
                    });
                    dispatch(profileActions.profileRequest())
                    setDisable(true);
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: res.data.message,
                    position: "top"
                })
                return
            }
            Toast.show({
                type: "error",
                text1: "Chức năng đang bảo trì",
                position: "top"
            })
        })
    }
    // console.log("res", moment(profile?.data?.dob).format("DD-MM-YYYY"))

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#FFF", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center" }} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{
                    username: profile?.data?.username || "",
                    dob: profile?.data?.dob || "",
                    groupsId: profile?.data?.groups_user?.[0]?.id || "",
                    full_name: profile?.data?.full_name || "",
                    phone: profile?.data?.phone || "",
                    city: profile?.data?.address?.city?.id,
                    district: profile?.data?.address?.district?.id,
                    subDistrict: profile?.data?.address?.subDistrict?.id,
                    addressLine: "",
                }}
                validationSchema={updateForm}
                enableReinitialize
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
                {({ submitForm, resetForm }) => (
                    <View style={{ width: width }}>
                        <View style={{ flex: 1, alignItems: "center", zIndex: 100, backgroundColor: "#F6BB57" }}>
                            <HeaderContainer isBack></HeaderContainer>
                            <View style={[styles.avata, styles.boxShadowAvata]}></View>
                        </View>
                        <View style={{ flex: 6, backgroundColor: "#FFFF", padding: "5%", justifyContent: "space-around", paddingBottom: "5%", marginTop: 30 }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={{ flexDirection: "row", padding: 10, borderWidth: 1, borderColor: "#e0dcce", borderRadius: 10 }}
                                    onPress={() => {
                                        if (disable) {
                                            setDisable(false);
                                            // setody({ ...body })
                                        } else {
                                            resetForm();
                                            setDisable(true);
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUserEdit} />
                                    <Text style={{ marginLeft: 10, color: AppColor.CORLOR_TEXT }}>{disable ? "Chỉnh sửa" : "Hủy"}</Text>
                                </TouchableOpacity>
                            </View>
                            <ContainerField title="Loại tài khoản">
                                <Field
                                    component={AppSelectGroupUser}
                                    name="groupsId"
                                    disabled
                                    iconLeft={faUserAlt}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Chọn loại tài khoản"
                                />
                            </ContainerField>
                            <ContainerField title="Tên tài khoản">
                                <Field
                                    component={Input}
                                    name="username"
                                    placeholder="Nhập tên tài khoản"
                                    iconLeft={faUserCircle}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    editable={!disable}
                                    disabled
                                />
                            </ContainerField>
                            <ContainerField title="Họ và tên">
                                <Field
                                    component={Input}
                                    name="full_name"
                                    placeholder="Nhập họ và tên"
                                    iconLeft={faUserCircle}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    editable={!disable}
                                />
                            </ContainerField>
                            <ContainerField title="Số điện thoại">
                                <Field
                                    component={Input}
                                    keyboardType="numeric"
                                    name="phone"
                                    iconLeft={faPhone}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Nhập số điện thoại"
                                    editable={!disable}
                                />
                            </ContainerField>
                            <ContainerField title="Ngày sinh" disabled={disable}>
                                <Field
                                    component={DateTimePicker}
                                    iconLeft={faCalendar}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    name="dob"
                                    placeholder="Nhập ngày sinh"
                                    disabled={disable}
                                />
                            </ContainerField>
                            <ContainerField title="Tỉnh/Thành phố">
                                <Field
                                    component={AppSelectTinh}
                                    iconLeft={faCity}
                                    name="city"
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Tỉnh/Thành phố"
                                    onSelectOption={(item) => { setIdTinh(item?.id || "") }}
                                    disabled={disable}
                                />
                            </ContainerField>
                            <ContainerField title="Quận/Huyện">
                                <Field
                                    component={AppSelectHuyen}
                                    name="district"
                                    iconLeft={faCity}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Quận/Huyện"
                                    idTinh={idTinh}
                                    onSelectOption={(item) => { setIdHuyen(item?.id || "") }}
                                    disabled={disable}
                                />
                            </ContainerField>
                            <ContainerField title="Quận/Huyện">
                                <Field
                                    component={AppSelectXa}
                                    name="subDistrict"
                                    iconLeft={faCity}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Quận/Huyện"
                                    idHuyen={idHuyen}
                                    disabled={disable}
                                />
                            </ContainerField>
                            {!disable && (
                                <ButtonCustom title="Lưu" styleContain={{ backgroundColor: "#F6BB57", marginTop: 20 }} onPress={submitForm} />
                            )}
                        </View>
                    </View>
                )}
            </Formik>

            {/* </View> */}
        </KeyboardAwareScrollView >
    );

}