import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { AppColor } from "../../Helper/propertyCSS";
import styles from "./styles";
import { useRoute } from "@react-navigation/core";
import HeaderContainer from "../../Components/HeaderContainer";
export default () => {
    const { params } = useRoute<any>();
    return (
        <View style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={0}
                    flexCenter={10}
                    isBack
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Thông báo</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.header}>
                <Image source={require("../../Assets/Images/sos.png")} style={{ width: 50, height: 50, marginRight: 10 }} resizeMode="cover" />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold" }}>{params.item.title}</Text>
                    <Text style={{ color: AppColor.CORLOR_TEXT }}>{params.item.time}</Text>
                </View>
            </View>
            <View style={styles.contents}>
                <Text style={{ color: AppColor.CORLOR_TEXT }}>{params.item.contents}</Text>
            </View>
        </View>
    )
}