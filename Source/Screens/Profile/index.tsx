import { faArrowRight, faCamera, faChevronLeft, faChevronRight, faHistory, faIdBadge, faLock, faPersonBooth, faSignOutAlt, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { AppColor, BackgoundMain } from "../../Helper/propertyCSS";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core"
import { useDispatch, useSelector } from "react-redux";
import { badgeShowActions, profileActions, userActions } from "../../Redux/Actions";
import HeaderContainer from "../../Components/HeaderContainer";
import { RootState } from "../../Redux/Reducers";
import AppImageCrop from "../../Components/AppImageCrop";
import { apiUploadImg } from "../../ApiFunction/Auth";
import Toast from "react-native-toast-message";
import { isEmpty } from "lodash";
import { IMAGE_URL } from "../../Constrants/url";
export default () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profileReducer = useSelector((state: RootState) => state.profileReducer);
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const [imageModal, setImageModal] = useState(false);
    const uploadImage = (image) => {
        if (isEmpty(image)) {
            Toast.show({
                type: "error",
                text1: 'Bạn chưa chọn ảnh nào',
                position: "top"
            })
            return;
        }
        const arr = image.path.split('/');
        const name = arr[arr.length - 1];
        const body = {
            imageName: name,
            encodedImage: image.data,
            id: profileReducer.data.id
        }
        apiUploadImg(body).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    Toast.show({
                        type: "success",
                        text1: 'Cập nhật ảnh thành công',
                        position: "top"
                    });
                    dispatch(profileActions.profileRequest())
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: e.data.message,
                    position: "top"
                })
                return;
            }
            Toast.show({
                type: "error",
                text1: 'Chức năng đang bảo trì',
                position: "top"
            })
            return;
        })
    }

    return (
        <View style={{ width: width, height: height, paddingBottom: 80, backgroundColor: BackgoundMain, }}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={1}
                    flexCenter={10}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFF" }}>Tài khoản</Text>
                        </View>
                    )}
                    flexLeft={1}
                />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: 200, height: 250, alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <TouchableOpacity style={[styles.pickerImg, MainStyle.boxShadow]} onPress={() => { setImageModal(true) }}>
                        <FontAwesomeIcon icon={faCamera} />
                    </TouchableOpacity>
                    {profileReducer?.data?.images?.img_url ? (
                        <Image
                            source={{ uri: `${IMAGE_URL}${profileReducer?.data?.images?.img_url}` }}
                            style={{ width: height * 0.25, height: height * 0.25, borderRadius: (height * 0.25) / 2 }}
                            loadingIndicatorSource={require('../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require('../../Assets/Images/userAvata.jpeg')}
                            style={{ width: height * 0.25, height: height * 0.25, borderRadius: (height * 0.25) / 2 }}
                            loadingIndicatorSource={require('../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    )}
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>{profileReducer.data?.full_name}</Text>
                </View>
                <AppImageCrop visible={imageModal} setVisible={setImageModal} onSave={uploadImage} cropperCircleOverlay={true} />
            </View>
            <View style={{ height: "93%", backgroundColor: "#F6F5F5", justifyContent: "space-around", paddingTop: "5%" }}>
                <View style={{ height: 130, justifyContent: "center", alignItems: "center" }}>
                    <View style={[MainStyle.boxShadow, { backgroundColor: "#FFF", width: "90%", height: "85%", borderRadius: 10, padding: 10, paddingBottom: 5, paddingTop: 5, justifyContent: "space-around" }]}>
                        <View style={{ flexDirection: "row", width: "100%", }}>
                            <Text style={{ flex: 2, fontWeight: "bold" }}>Tài khoản:</Text>
                            <Text style={{ flex: 7 }}>{profileReducer.data?.username}</Text>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%", }}>
                            <Text style={{ flex: 2, fontWeight: "bold" }}>SĐT:</Text>
                            <Text style={{ flex: 7 }}>{profileReducer.data?.phone}</Text>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%", }}>
                            <Text style={{ flex: 2, fontWeight: "bold" }}>Địa chỉ:</Text>
                            <Text style={{ flex: 7 }}>{profileReducer.data?.address?.subDistrict?.name + ' - ' + profileReducer.data?.address?.district?.name + ' - ' + profileReducer.data?.address?.city?.name}</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 2, backgroundColor: "#FFF" }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]} onPress={() => { navigation.navigate("Personal", { profile: profileReducer.data }) }}>
                                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", }}>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} size={15} color={"#A0A6BE"} icon={faIdBadge} />
                                    <Text >Cập nhật thông tin cá nhân</Text>
                                </View>
                                <View style={[styles.containerIcon]}>
                                    <FontAwesomeIcon style={{ flex: 1 }} size={15} color={"#A0A6BE"} icon={faChevronRight} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]}>
                                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", }}>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} size={15} color={"#A0A6BE"} icon={faHistory} />
                                    <Text >Lịch sử hoạt động</Text>
                                </View>
                                <View style={[styles.containerIcon]}>
                                    <FontAwesomeIcon style={{ flex: 1 }} size={15} color={"#A0A6BE"} icon={faChevronRight} />
                                </View>
                            </TouchableOpacity>
                        </View> */}
                        <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]} onPress={() => { navigation.navigate("ChangePasswordAuth") }}>
                                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", }}>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} size={15}
                                        //  color={"#A0A6BE"}
                                        color={"#A0A6BE"}
                                        icon={faLock} />
                                    <Text >Thay đổi mật khẩu</Text>
                                </View>
                                <View style={[styles.containerIcon]}>
                                    <FontAwesomeIcon style={{ flex: 1 }} size={15}
                                        // color={"#A0A6BE"}
                                        color={"#A0A6BE"}
                                        icon={faChevronRight} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]} onPress={() => { dispatch(userActions.logout({ data: userReducer, isexpired: false })) }}>
                                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", }}>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} size={15} color={"#A0A6BE"} icon={faSignOutAlt} />
                                    <Text >Đăng xuất</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );

}