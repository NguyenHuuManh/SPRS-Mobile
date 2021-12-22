import { faChevronLeft, faClock, faMapMarked, faMapMarkerAlt, faPhone, faShoppingBasket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetReliefPointCommon } from "../../../ApiFunction/ReliefPoint";
import HeaderContainer from "../../../Components/HeaderContainer";
import { IMAGE_URL } from "../../../Constrants/url";
import { AppColor } from "../../../Helper/propertyCSS";
import { height } from "../../../Helper/responsive";
import { RootState } from "../../../Redux/Reducers";
import styles from "../styles";
const type = [
    'rp', 'st', 'sos', 'org'
]
const StoreDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const [items, setItems] = useState<any>([]);
    const navigation = useNavigation<any>();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const getReliefPoint = (id) => {
        if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
        apiGetReliefPointCommon({ id: id }).then((res) => {
            console.log("ressss", res)
            if (res.status == 200) {
                if (res.data.code == "200") {
                    setData(res.data.obj);
                    setItems(res.data.obj.reliefInformations);
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
        getReliefPoint(point?.id);
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
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Thông tin điểm cứu trợ</Text>
                        </View>
                    )}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[styles.headerPoint]}><Text style={[styles.textHeader]}>{data?.name}</Text></View>
                <View style={[{ width: "95%", backgroundColor: "black", padding: 1, borderRadius: 10, marginTop: 10, alignItems: 'center', height: height * 0.25 }]}>
                    {data?.images?.img_url ? (
                        <Image
                            source={{ uri: `${IMAGE_URL}${data?.images?.img_url}` }}
                            style={{ width: '100%', height: '100%' }}
                            loadingIndicatorSource={require('../../')}
                            resizeMethod="resize"
                            resizeMode="center"
                        />
                    ) : (
                        <Image
                            source={require('../../../Assets/Images/orgAvatar.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMethod="resize"
                            resizeMode="center"
                        />
                    )}
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
                                                        type: "rp"
                                                    },
                                                    // screen: "DetailPoint"
                                                })
                                        } else {
                                            alert('Điểm cứu trợ đang không hoạt động');
                                        }

                                    }}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} color={AppColor.BUTTON_MAIN} />
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
                            <FontAwesomeIcon icon={faClock} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <View>
                            <Text style={[styles.textDescription, { color: data.status + '' == '0' ? "orange" : data.status + '' == '1' ? "#32a864" : data.status == '2' ? "gray" : "red" }]}>
                                {data.status + '' == '0' ? "Đã kết thúc" : data.status + '' == '1' ? "Đang hoat động" : data.status == '2' ? "Sắp diễn ra" : "Ngừng hoạt động"}
                            </Text>
                            <Text style={[styles.textDescription]}>{`Dừng hoạt động lúc ${data.close_time}`}</Text>
                        </View>
                    </View>
                    <View style={[styles.addressView, { alignItems: 'flex-start' }]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faShoppingBasket} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <View style={{ width: '90%' }}>
                            {data?.reliefInformations?.map((e) => (
                                <View style={[{ flexDirection: "row", justifyContent: "space-around", width: '100%' }]} key={e.id}>
                                    <Text style={[{ width: "50%", textAlign: "left", color: AppColor.CORLOR_TEXT }]}>{e.item.name}: </Text>
                                    <Text style={[{ width: "50%", textAlign: "right", color: AppColor.CORLOR_TEXT }]}>{`${e.quantity} ${e.item.unit}`}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faUser} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <Text style={[styles.textDescription]}>{`${data?.user_rp?.full_name}`}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faPhone} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <Text style={[styles.textDescription]}>{`${data?.user_rp?.phone}`}</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default StoreDetail;