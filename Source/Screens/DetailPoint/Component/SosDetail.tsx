import { faCalendar, faChevronLeft, faMapMarkerAlt, faPager, faPenAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetSOSCommon } from "../../../ApiFunction/PointPublic";
import HeaderContainer from "../../../Components/HeaderContainer";
import { IMAGE_URL } from "../../../Constrants/url";
import { AppColor } from "../../../Helper/propertyCSS";
import { height } from "../../../Helper/responsive";
import { RootState } from "../../../Redux/Reducers";
import { MainStyle } from "../../../Style/main_style";
import styles from "../styles";

const SosDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const navigation = useNavigation<any>();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const getSOSPoint = (id) => {
        if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
        apiGetSOSCommon({ id: id }).then((res) => {
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

    console.log(point, 'point');
    useEffect(() => {
        getSOSPoint(point?.id);
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
                            navigation.goBack();
                        }
                    }}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>SOS</Text>
                        </View>
                    )}
                />
            </View>
            <View style={[{ width: "100%", backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 20, alignItems: "center" }]}>
                {data?.user?.images?.img_url ? (
                    <Image
                        source={{ uri: `${IMAGE_URL}${data?.images?.img_url}` }}
                        style={{ width: height * 0.25, height: height * 0.25, borderRadius: (height * 0.25) / 2 }}
                        loadingIndicatorSource={require('../../../Assets/Icons/Blinking_squares.gif')}
                        resizeMethod="scale"
                        resizeMode="cover"
                    />
                ) : (
                    <Image
                        source={require('../../../Assets/Images/userAvata.jpeg')}
                        style={{ width: height * 0.25, height: height * 0.25 }}
                        // loadingIndicatorSource={require('../../../Assets/Icons/Blinking_squares.gif')}
                        resizeMethod="scale"
                        resizeMode="cover"
                    />
                )}
                <View style={[styles.headerPoint]}><Text style={[styles.textHeader]}>{data?.user?.full_name}</Text></View>
            </View>
            <View style={[styles.inforView]}>
                <View style={[styles.addressView]}>
                    <View style={[styles.titleView]}>
                        {
                            from == 'Notification' ? (
                                <TouchableOpacity onPress={() => {
                                    if (data.status + '' == '1') {
                                        navigation.navigate("MapCluser",
                                            {
                                                toLocation:
                                                {
                                                    id: data.id,
                                                    location: {
                                                        latitude: Number(data.address.GPS_lati),
                                                        longitude: Number(data.address.GPS_long)
                                                    },
                                                    type: "sos"
                                                },
                                                // screen: "DetailPoint"
                                            })
                                    } else {
                                        alert('SOS đã tắt');
                                    }

                                }}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color={AppColor.BUTTON_MAIN} />
                                </TouchableOpacity>
                            ) : (
                                <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color={AppColor.BUTTON_MAIN} />
                            )
                        }
                    </View>
                    <Text style={[styles.textDescription]}>{data?.address?.subDistrict.name + " - " + data?.address?.district.name + " - " + data?.address?.city.name}</Text>
                </View>
                <View style={[styles.addressView]}>
                    <View style={[styles.titleView]}>
                        <FontAwesomeIcon icon={faPhone} size={18} color={AppColor.BUTTON_MAIN} />
                    </View>
                    <Text style={[styles.textDescription]}>{data?.user?.phone}</Text>
                </View>
                <View style={[styles.addressView]}>
                    <View style={[styles.titleView]}>
                        <FontAwesomeIcon icon={faPenAlt} size={18} color={AppColor.BUTTON_MAIN} />
                    </View>
                    <Text style={{ color: AppColor.CORLOR_TEXT }}>{data?.description || 'cần trợ giúp'}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default SosDetail;