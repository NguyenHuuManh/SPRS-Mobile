import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { apiGetAllNotification } from "../../ApiFunction/Notification";
import HeaderContainer from "../../Components/HeaderContainer";
import { AppColor } from "../../Helper/propertyCSS";
import styles from "./styles";
import { apiUpdateStatusNotification } from "../../ApiFunction/Notification";
import { useSelector } from "react-redux";

export default () => {
    const [pageSize, setPageSize] = useState({ pageSize: 10, pageIndex: 1 });
    const [data, setData] = useState<any>([]);
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const [totalItem, setTotalItem] = useState(0);
    const badgeShow = useSelector((state) => state.badgeReducer)
    const focusNotificationTab = useSelector((state) => state.forcusNotificationReducer);

    useEffect(() => {
        if (badgeShow.data.number > 0 && focusNotificationTab.status) {
            setPageSize({ pageSize: 10, pageIndex: 1 });
        }
    }, [badgeShow])
    const getNotification = () => {
        apiGetAllNotification(pageSize).then((res) => {
            if (res.status == 200) {
                if (res.data.code == '200') {
                    setData(res.data.obj.object);
                    setTotalItem(res.data.obj.totalRecord);
                }
            }
        })
    }
    useEffect(() => {
        getNotification();
    }, [pageSize]);


    const updateNotificationStatus = (item) => {
        apiUpdateStatusNotification({ id: item.id, status: "read" }).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    console.log("read success");
                }
            } else {
                console.log("err");
            }
        })
    }

    const navigate = (item) => {
        if (['rp', 'st', 'sos', 'org'].includes(item.type)) {
            updateNotificationStatus(item);
            navigation.navigate('DetailPoint', { point: { ...item.sender, type: item.type }, from: 'Notification' });
        } else {
            navigation.navigate('NotificationDetail', { item, from: 'Notification' });
        }
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item]} onPress={() => {
                navigate(item);
            }}>
                <View style={{ flex: 2 }}>
                    <Image source={require("../../Assets/Images/logo.png")} style={{ width: 50, height: 50 }} resizeMode="cover" />
                </View>
                <View style={{ flex: 8, flexDirection: "column" }}>
                    <Text style={{ fontWeight: item.status == 'uncheck' ? "bold" : "normal" }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >{item.type == 'ad' ? "Thông báo hệ thống" : item?.sender?.name}</Text>
                    <Text style={{
                        color: item.status == 'uncheck' ? "#000" : AppColor.CORLOR_TEXT,
                        fontWeight: item.status == 'uncheck' ? "bold" : "normal"
                    }}>{item?.create_time}</Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                            color: item.status == 'uncheck' ? "#000" : AppColor.CORLOR_TEXT, marginTop: 10,
                            fontWeight: item.status == 'uncheck' ? "bold" : "normal",
                        }}>{item?.message}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={1}
                    flexCenter={10}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFF" }}>Thông báo</Text>
                        </View>
                    )}
                    flexLeft={1}
                />
            </View>
            <FlatList
                data={data}
                keyExtractor={(item => item.id + '')}
                renderItem={renderItem}
            />
        </View>
    )
}