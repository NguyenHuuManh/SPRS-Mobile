import { faBell, faBellSlash, faChevronLeft, faClock, faMapMarked, faMapMarker, faMapMarkerAlt, faMarker, faPenAlt, faPhone, faShoppingBasket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetStoreCommon } from "../../../ApiFunction/PointPublic";
import { apiSubcribleStore, apiUnSubcribleStore } from "../../../ApiFunction/StorePoint";
import ButtonCustom from "../../../Components/ButtonCustom";
import HeaderContainer from "../../../Components/HeaderContainer";
import { IMAGE_URL } from "../../../Constrants/url";
import { AppColor } from "../../../Helper/propertyCSS";
import { height } from "../../../Helper/responsive";
import { RootState } from "../../../Redux/Reducers";
import { MainStyle } from "../../../Style/main_style";
import styles from "../styles";
const StoreDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const menu = useSelector((state: RootState) => state.menuReducer);


    const getStorePoint = (id) => {
        if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
        apiGetStoreCommon(id).then((res) => {
            console.log("res", res);
            if (res.status == 200) {
                if (res.data.code == "200") {
                    setData(res.data.obj);
                } else {
                    Toast.show({
                        type: "error",
                        text1: res.data.message,
                        position: "top"
                    })
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: "Chức năng đang bảo trì",
                    position: "top"
                })
            }
        }).finally(() => { setLoading(false) });
    }

    useEffect(() => {
        getStorePoint(point?.id);
    }, [point]);


    const subcribleStore = () => {
        const body = {
            store_id: data.stores.id
        }
        setLoading(true);
        apiSubcribleStore(body).then((e) => {
            console.log("resSubcrible", e);
            if (e.status == 200) {
                if (e.data.code == '200') {
                    getStorePoint(point?.id)
                } else {
                    Toast.show({
                        type: "error",
                        text1: e?.data?.message,
                        position: "top"
                    })
                    setLoading(false);
                    return;
                }
                setLoading(false);
                return;
            }
        })
    }

    const unsubcribleStore = () => {
        const body = {
            store_id: data.stores.id
        }
        setLoading(true);
        apiUnSubcribleStore(body).then((e) => {
            console.log("unresSubcrible", e);
            if (e.data.code == '200') {
                getStorePoint(point?.id)
            } else {
                Toast.show({
                    type: "error",
                    text1: e?.data?.message,
                    position: "top"
                })
                setLoading(false);
                return
            }
            setLoading(false);
            return;
        })
    }
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
                        else {
                            navigation.goBack();
                        }
                    }}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Thông tin cửa hàng</Text>
                        </View>
                    )}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[styles.headerPoint]}><Text style={[styles.textHeader]}>{data?.stores?.name}</Text></View>
                <View style={[{ width: "90%", backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 10, alignItems: "center" }]}>
                    {data?.stores?.images?.img_url ? (
                        <Image
                            source={{ uri: `${IMAGE_URL}${data?.stores?.images?.img_url}` }}
                            style={{ width: '100%', height: height * 0.25 }}
                            loadingIndicatorSource={require('../../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require('../../../Assets/Images/orgAvatar.png')}
                            style={{ width: height * 0.25, height: height * 0.25 }}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    )}
                </View>
                {!userReducer.isGuest && menu.data.map((e) => e.code)?.includes('PER_MOB_SUBCRIBE') && (
                    <View style={{ width: "90%", flexDirection: "row-reverse", paddingTop: 20 }}>
                        {data?.isSubcribe ? (
                            <ButtonCustom noShadow styleContain={[{ backgroundColor: '#ececec', flexWrap: "wrap", textAlign: "center", width: 130 }]} onPress={unsubcribleStore}>
                                <Text style={{ color: AppColor.CORLOR_TEXT, marginRight: 5, fontWeight: "bold", textAlign: "center" }}> ĐÃ ĐĂNG KÝ</Text>
                                {/* <FontAwesomeIcon icon={faBellSlash} color="#FFF" size={25} /> */}
                            </ButtonCustom>
                        ) :
                            (
                                <ButtonCustom noShadow styleContain={[{ backgroundColor: AppColor.BUTTON_MAIN, flexWrap: "wrap", textAlign: "center", width: 130 }, MainStyle.boxShadowItem]} onPress={subcribleStore}>
                                    <Text style={{ color: "#FFFF", marginRight: 5, fontWeight: "bold" }}>ĐĂNG KÝ</Text>
                                    {/* <FontAwesomeIcon icon={faBell} size={20} color="#FFF" /> */}
                                </ButtonCustom>
                            )
                        }
                    </View>
                )}
                <View style={[styles.inforView]}>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            {
                                from == 'Notification' ? (
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("MapCluser",
                                            {
                                                toLocation:
                                                {
                                                    id: data.id,
                                                    location: {
                                                        latitude: Number(data.address.GPS_lati),
                                                        longitude: Number(data.address.GPS_long)
                                                    },
                                                    type: "st"
                                                },
                                                // screen: "DetailPoint"
                                            })
                                    }}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} color={AppColor.BUTTON_MAIN} />
                                    </TouchableOpacity>
                                ) : (
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color={AppColor.BUTTON_MAIN} />
                                )
                            }
                        </View>
                        <Text style={[styles.textDescription]}>{data?.stores?.address?.subDistrict.name + " - " + data?.stores?.address?.district.name + " - " + data?.stores?.address?.city.name}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faClock} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <View style={styles.textDescription}>
                            <Text
                                style={[{ marginRight: 10, color: data?.stores?.status == 0 ? 'green' : data?.stores?.status == 1 ? 'orange' : '#ec948e' }]}>
                                {data?.stores?.status == 0 ? "Mở cửa" : data?.stores?.status == 1 ? "Đang đóng cửa" : "Tạm dừng hoạt động"}
                            </Text>
                            <Text style={[]}>
                                {data?.stores?.status == 0 ? "Đóng cửa lúc " + data?.stores?.close_time : data?.stores?.status == 1 ? "Mở cửa lúc " + data?.stores?.open_time : ""}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faShoppingBasket} size={18} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <View style={[styles.textDescription]}>
                            {data?.stores?.store_category?.map((e) => (
                                <Text style={[]} key={e?.id}>{e?.name + ', ' || ''} </Text>
                            ))}
                        </View>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faPenAlt} size={18} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <View style={[styles.textDescription]}>
                            <Text style={[]}>{data.stores?.description + ', ' || ''} </Text>
                        </View>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faPhone} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <Text style={[styles.textDescription]}>{`${data?.stores?.user_st?.phone || ''}`}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <FontAwesomeIcon icon={faUser} color={AppColor.BUTTON_MAIN} />
                        </View>
                        <Text style={[styles.textDescription]}>{`${data?.stores?.user_st?.full_name || ''}`}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default StoreDetail;