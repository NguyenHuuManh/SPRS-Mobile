import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetSOSCommon } from "../../../ApiFunction/PointPublic";
import HeaderContainer from "../../../Components/HeaderContainer";
import { AppColor } from "../../../Helper/propertyCSS";
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

    useEffect(() => {
        getSOSPoint(point?.id);
    }, [point])

    console.log("data", data)
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
                        }
                    }}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>SOS</Text>
                        </View>
                    )}
                />
            </View>
            <View style={[{ width: "100%", height: 180, backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 20, alignItems: "center" }]}>
                <Image source={{ uri: "https://image-bucket-sprs.s3.ap-southeast-1.amazonaws.com/1638187148384-rn_image_picker_lib_temp_b19224ed-86ab-4aaa-b377-f8b90847374c.jpg?fbclid=IwAR3Pa0Yn9playCnXsINBxo3MhFydIRIKTofKPiUruKANd99MjKymFsQxhjI" }}
                    resizeMethod="scale"
                    resizeMode="center"
                    style={{ width: 180, height: 180, borderRadius: 180 }}
                />
                <View style={[MainStyle.boxShadow, { width: "50%", backgroundColor: "#FFFF", alignItems: "center" }]}>
                    <Text>Mức độ {data.level == 0 ? "Khẩn cấp" : data.level == 1 ? "Bình thường" : "thấp"}</Text>
                </View>
            </View>
            <View style={{ width: "100%", alignItems: "center", marginTop: 50, backgroundColor: "gray", }}>
                <View style={{ width: "90%", alignItems: "center", height: 30, justifyContent: "center" }}>
                    <Text>Thông tin được cung cấp từ điểm cầu cứu</Text>
                </View>
            </View>
            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                <View style={{ width: "90%", alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={[styles.titleText, { marginTop: 10 }]}>Vị trí:</Text>
                    <Text style={[styles.textDescription]}>{data?.address?.subDistrict.name + " - " + data?.address?.district.name + " - " + data?.address?.city.name}</Text>
                    <Text style={[styles.titleText, { marginTop: 10 }]}>Mô tả:</Text>
                    <View style={[MainStyle.boxShadow, { width: "100%", backgroundColor: "#FFFF", borderRadius: 10, height: 100, padding: 10, marginTop: 10 }]}>
                        <Text style={{ color: AppColor.CORLOR_TEXT }}>Mô tả cccccc</Text>
                    </View>
                    <Text style={[styles.titleText, { marginTop: 10 }]}>Thông tin liên hệ:</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                        <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Họ và tên: </Text>
                        <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{data?.user?.full_name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                        <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Số điện thoại: </Text>
                        <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{data?.user?.phone}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                        <Text style={[styles.textDescription, { width: "50%", textAlign: "left" }]}>Ngày phát tín hiểu:</Text>
                        <Text style={[styles.textDescription, { width: "50%", textAlign: "right" }]}>{data?.user?.create_time}</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}
export default SosDetail;