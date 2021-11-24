import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { apiGetAllNotification } from "../../ApiFunction/Notification";
import { AppColor } from "../../Helper/propertyCSS";
import styles from "./styles";
export default () => {
    const [pageSize, setPageSize] = useState({ pageSize: 10, pageIndex: 0 });
    const [data, setData] = useState<any>([]);
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();

    const getNotification = () => {
        apiGetAllNotification(pageSize).then((res) => {
            if (res.status == 200) {
                if (res.data.code == '200') {
                    setData(res.data.obj);
                }
            }
        })
    }
    useEffect(() => {
        getNotification();
    }, [pageSize]);

    useEffect(() => {
        if (params?.reload == true) {
            getNotification();
        }
    }, [params])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item]} onPress={() => { navigation.navigate("NotificationDetail", { item }) }}>
                <View style={{ flex: 2 }}>
                    <Image source={require("../../Assets/Images/sos.png")} style={{ width: 50, height: 50 }} resizeMode="cover" />
                </View>
                <View style={{ flex: 8, flexDirection: "column" }}>
                    <Text style={{ fontWeight: item.status == 'uncheck' ? "bold" : "normal" }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >{item.sender.name}</Text>
                    <Text style={{
                        color: item.status == 'uncheck' ? "#000" : AppColor.CORLOR_TEXT,
                        fontWeight: item.status == 'uncheck' ? "bold" : "normal"
                    }}>{item.create_time}</Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                            color: item.status == 'uncheck' ? "#000" : AppColor.CORLOR_TEXT, marginTop: 10,
                            fontWeight: item.status == 'uncheck' ? "bold" : "normal",
                        }}>{item.message}</Text>
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
            />
        </View>
    )
}