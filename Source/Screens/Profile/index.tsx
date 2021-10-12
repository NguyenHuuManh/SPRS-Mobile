import { faArrowRight, faChevronLeft, faChevronRight, faHistory, faIdBadge, faLock, faPersonBooth, faSignOutAlt, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, View, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BackgoundMain } from "../../Helper/propertyCSS";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core"
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Redux/Actions";
export default () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profileReducer = useSelector((state) => state.profileReducer);
    console.log("profileReducer", profileReducer);
    return (
        <View style={{ width: width, height: height, paddingBottom: 80, backgroundColor: BackgoundMain, }}>
            <View style={{ flex: 2, alignItems: "center", zIndex: 100, backgroundColor: "pink", justifyContent: "center" }}>
                <ImageBackground source={require('../../Assets/Images/Road01.jpg')}
                    resizeMode="stretch"
                    style={{ width: "100%", height: "100%", backgroundColor: "red", alignItems: "center" }}
                >
                    <View style={[styles.avata, styles.boxShadowAvata, { backgroundColor: "#FFF" }]}></View>
                </ImageBackground>
            </View>
            <View style={{ flex: 6, backgroundColor: "#F6F5F5", justifyContent: "space-around", paddingTop: "20%" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={[MainStyle.boxShadow, { backgroundColor: "#FFF", width: "90%", height: "85%", borderRadius: 10, padding: 10, justifyContent: "center" }]}>
                        <Text>{profileReducer.data?.full_name}</Text>
                        <Text>Số điện thoại: {profileReducer.data?.phone}</Text>
                        <Text>Địa chỉ: {profileReducer.data?.address}</Text>
                        <Text>Tài khoản: Người dùng bình thường </Text>
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
                        <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]}>
                                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", }}>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} size={15} color={"#A0A6BE"} icon={faHistory} />
                                    <Text >Lịch sử hoạt động</Text>
                                </View>
                                <View style={[styles.containerIcon]}>
                                    <FontAwesomeIcon style={{ flex: 1 }} size={15} color={"#A0A6BE"} icon={faChevronRight} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]} onPress={() => { navigation.navigate("ChangePasswordAuth") }}>
                                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", }}>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} size={15} color={"#A0A6BE"} icon={faLock} />
                                    <Text >Thay đổi mật khẩu</Text>
                                </View>
                                <View style={[styles.containerIcon]}>
                                    <FontAwesomeIcon style={{ flex: 1 }} size={15} color={"#A0A6BE"} icon={faChevronRight} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.rowItem]}>
                            <TouchableOpacity style={[styles.touchItem]} onPress={() => { dispatch(userActions.logout()) }}>
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