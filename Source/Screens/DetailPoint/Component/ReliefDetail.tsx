import { faChevronLeft, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetReliefPointCommon } from "../../../ApiFunction/ReliefPoint";
import { apiSubcribleStore } from "../../../ApiFunction/StorePoint";
import HeaderContainer from "../../../Components/HeaderContainer";
import { RootState } from "../../../Redux/Reducers";
import { MainStyle } from "../../../Style/main_style";
import styles from "../styles";
const type = [
    'rp', 'st', 'sos', 'org'
]
const StoreDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const [items, setItems] = useState<any>([]);
    const navigation = useNavigation();
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
                            navigation.replace(from);
                            // navigation.goBack();
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
                <View style={[styles.inforView]}>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <Text style={[styles.titleText]}>Địa điểm</Text>
                            <FontAwesomeIcon icon={faMapMarked} />
                            <Text>:</Text>
                        </View>
                        <Text style={[styles.textDescription]}>{data?.address?.subDistrict.name + " - " + data?.address?.district.name + " - " + data?.address?.city.name}</Text>
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView]}>
                            <Text style={[styles.titleText]}>Thời gian: </Text>
                        </View>
                        <Text style={[styles.textDescription]}>{`Từ ${data.open_time} đến ${data.close_time}`}</Text>
                    </View>
                    <View style={[styles.addressView, { minHeight: 100 }]}>
                        <View style={[styles.titleView, styles.underLine]}>
                            <Text style={[styles.titleText]}>Nhu yếu phẩm: </Text>
                        </View>
                        {data?.reliefInformations?.map((e) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>{e.item.name}: </Text>
                                <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${e.quantity} ${e.item.unit}`}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={[styles.addressView]}>
                        <View style={[styles.titleView, styles.underLine]}>
                            <Text style={[styles.titleText]}>Thông tin liên hệ: </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Họ và tên: </Text>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${data?.user_rp?.full_name}`}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Số điện thoạt: </Text>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${data?.user_rp?.phone}`}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Ngày tạo </Text>
                            <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{`${data?.user_rp?.create_time}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={[{ width: "100%", height: 180, backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 20 }]}>
                    <Image source={{ uri: data?.images?.img_url }} style={{ width: "100%", height: "100%" }} resizeMethod="scale" resizeMode="cover" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default StoreDetail;