import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { apiGetAllNotification } from "../../ApiFunction/Notification";
import { AppColor } from "../../Helper/propertyCSS";
import styles from "./styles";
export default () => {
    const navigation = useNavigation<any>();
    const data = [
        {
            id: 1,
            title: "thông báo 1",
            time: "20/11/2021",
            contents: "Thông tin cửa hàng xyz"
        },
        {
            id: 2,
            title: "thông báo 1",
            time: "22/11/2021",
            contents: "Thông tin cửa hàng xyc"
        },
        {
            id: 3,
            title: "thông báo 1",
            time: "25/11/2021",
            contents: "Thông tin cửa hàng xyb"
        },
        {
            id: 4,
            title: "thông báo 1",
            time: "26/11/2021",
            contents: "Thông tin cửa hàng xyz"
        }
    ]

    const getNotification = () => {
        apiGetAllNotification().then((res) => {
            console.log("res", res);
        })
    }
    useEffect(() => {
        getNotification();
    }, [])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate("NotificationDetail", { item }) }}>
                <View style={{ flex: 2 }}>
                    <Image source={require("../../Assets/Images/sos.png")} style={{ width: 50, height: 50 }} resizeMode="cover" />
                </View>
                <View style={{ flex: 8, flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text style={{ color: AppColor.CORLOR_TEXT }}>{item.time}</Text>
                    <Text style={{ color: AppColor.CORLOR_TEXT, marginTop: 10 }}>{item.contents}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item => item.id + '')}
                renderItem={renderItem}
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
            />
        </View>
    )
}