import { faBell, faBellSlash, faChevronLeft, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetStoreCommon } from "../../../ApiFunction/PointPublic";
import { apiSubcribleStore, apiUnSubcribleStore } from "../../../ApiFunction/StorePoint";
import ButtonCustom from "../../../Components/ButtonCustom";
import HeaderContainer from "../../../Components/HeaderContainer";
import { RootState } from "../../../Redux/Reducers";
import { MainStyle } from "../../../Style/main_style";
import styles from "../styles";
const StoreDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const [items, setItems] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const userReducer = useSelector((state: RootState) => state.userReducer);
    console.log("userReducer", userReducer)
    const getStorePoint = (id) => {
        if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
        apiGetStoreCommon(id).then((res) => {
            console.log("res", res);
            if (res.status == 200) {
                if (res.data.code == "200") {
                    setData(res.data.obj);
                    setItems(res.data.obj.store_category);
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
                        if (from == 'SubcribeList') {
                            navigation.goBack();
                            return;
                        }
                        navigation.replace(from)
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
                <View style={[{ width: "90%", height: 180, backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 20 }]}>
                    <Image source={{ uri: data?.stores?.images?.img_url }} style={{ width: "100%", height: "100%" }} resizeMethod="scale" resizeMode="cover" />
                </View>
                {!userReducer.isGuest && (
                    <View style={{ width: "90%", flexDirection: "row-reverse" }}>
                        {data?.isSubcribe ? (
                            <ButtonCustom styleContain={{ backgroundColor: "#F6BB57", flexWrap: "wrap" }} onPress={unsubcribleStore}>
                                <Text style={{ color: "#FFFF", marginRight: 2 }}> Bỏ theo dõi</Text>
                                <FontAwesomeIcon icon={faBellSlash} color="#FFF" />
                            </ButtonCustom>
                        ) :
                            (
                                <ButtonCustom styleContain={{ backgroundColor: "#F6BB57", flexWrap: "wrap" }} onPress={subcribleStore}>
                                    <Text style={{ color: "#FFFF", marginRight: 2 }}>Theo dõi</Text>
                                    <FontAwesomeIcon icon={faBell} color="#FFF" />
                                </ButtonCustom>
                            )
                        }
                    </View>
                )}
                <View style={[styles.inforView]}>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <Text style={[styles.titleText]}>Địa điểm</Text>
                            <FontAwesomeIcon icon={faMapMarked} />
                            <Text>:</Text>
                        </View>
                        <Text style={[styles.textDescription]}>{data?.stores?.address?.subDistrict.name + " - " + data?.stores?.address?.district.name + " - " + data?.stores?.address?.city.name}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <Text style={[styles.titleText]}>Trạng thái: </Text>
                        </View>
                        <Text style={[styles.textDescription]}>{data?.stores?.status == 0 ? "Mở cửa" : data?.stores?.status == 1 ? "Đang mở cửa" : "Đóng cửa"}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <Text style={[styles.titleText]}>Mở cửa: </Text>
                        </View>
                        <Text style={[styles.textDescription]}>{`Từ ${data?.stores?.open_time} đến ${data?.stores?.close_time}`}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView, styles.underLine]}>
                            <Text style={[styles.titleText]}>Mặt hàng cung cấp: </Text>
                        </View>
                        {data?.stores?.store_category?.map((e) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={[styles.textDescription, { width: "100%", textAlign: "left" }]}>{e?.name || ''}: </Text>
                            </View>
                        ))}
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView, styles.underLine]}>
                            <Text style={[styles.titleText]}>Thông tin liên hệ: </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Họ và tên: </Text>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${data?.stores?.user_st?.full_name || ''}`}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Số điện thoạt: </Text>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${data?.stores?.user_st?.phone || ''}`}</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Ngày tạo </Text>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${data.full_name}`}</Text>
                        </View> */}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default StoreDetail;