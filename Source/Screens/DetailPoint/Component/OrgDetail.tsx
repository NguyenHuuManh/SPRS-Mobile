import { faChevronLeft, faMapMarked, faMapMarkerAlt, faPager } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetORGCommon } from "../../../ApiFunction/PointPublic";
import { apiGetReliefPointDetail } from "../../../ApiFunction/ReliefPoint";
import { apiSubcribleStore } from "../../../ApiFunction/StorePoint";
import HeaderContainer from "../../../Components/HeaderContainer";
import { IMAGE_URL } from "../../../Constrants/url";
import { AppColor } from "../../../Helper/propertyCSS";
import { height } from "../../../Helper/responsive";
import { RootState } from "../../../Redux/Reducers";
import { MainStyle } from "../../../Style/main_style";
import styles from "../styles";

const OrgDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const navigation = useNavigation<any>();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const getOrgPoint = (id) => {
        if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
        apiGetORGCommon({ id: id }).then((res) => {
            if (res.status == 200) {
                console.log("res", res)
                if (res.data.code == "200") {
                    setData(res.data.obj);
                    return;
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: res.data.message,
                    position: "top"
                })
            }
        })
    }

    useEffect(() => {
        getOrgPoint(point?.id);
    }, [point])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={1}
                    flexCenter={10}
                    flexLeft={1}
                    leftView
                    iconLeft={faChevronLeft}
                    leftOnpress={() => {
                        if (userReducer.isGuest) {
                            navigation.replace('Map');
                            return;
                        }
                        if (from == 'Notification') {
                            navigation.navigate(from)
                        } else {
                            // navigation.replace(from);
                            // navigation.goBack();
                            navigation.reset({
                                index: 1,
                                routes: [{ name: 'MapCluser' }]
                            })
                        }
                    }}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Thông tin tổ chức</Text>
                        </View>
                    )}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[{ width: "100%", height: 180, backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 20, alignItems: "center" }]}>
                    {data?.images?.img_url ? (
                        <Image
                            source={{ uri: `${IMAGE_URL}${data?.images?.img_url}` }}
                            style={{ width: height * 0.25, height: height * 0.25, borderRadius: (height * 0.25) / 2 }}
                            loadingIndicatorSource={require('../../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require('../../../Assets/Images/orgAvatar.png')}
                            style={{ width: height * 0.25, height: height * 0.25 }}
                            // loadingIndicatorSource={require('../../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    )}
                </View>
                <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
                    <View style={{ width: "90%", alignItems: "center", height: 30, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>{data?.name}</Text>
                    </View>
                </View>
                <View style={[styles.inforView]}>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <Text style={[styles.textDescription]}>{data?.address?.subDistrict.name + " - " + data?.address?.district.name + " - " + data?.address?.city.name}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faPager} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <Text style={{ color: AppColor.CORLOR_TEXT }}>Thông tin : {data?.description}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default OrgDetail;