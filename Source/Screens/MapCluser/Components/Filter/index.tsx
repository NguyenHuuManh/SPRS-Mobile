import React, { useState } from "react";
import { Animated, FlatList, Image, TouchableOpacity, View } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import { MainStyle } from "../../../../Style/main_style";
import style from "./style";

const AVATA_SIZE = 25;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE

export default () => {
    const scrollX = React.useRef(new Animated.Value(0)).current
    const points = [
        { name: "Điểm cứu trợ", id: "1" }, { name: "Thực phẩm", id: "2" }, { name: "Cắt tóc", id: "3" }, { name: "Điểm cứu trợ", id: "4" }, { name: "Thực phẩm", id: "5" }, { name: "Cắt tóc", id: "6" }, { name: "Điểm cứu trợ", id: "7" }, { name: "Thực phẩm", id: "8" }, { name: "Cắt tóc", id: "9" }, { name: "Điểm cứu trợ", id: "10" }, { name: "Thực phẩm", id: "11" }, { name: "Cắt tóc", id: "12" }
    ]


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[{
                width: 100,
                height: 40,
                borderRadius: 10,
                marginRight: 10,
                backgroundColor: "#FFFF",
                marginBottom: Margin_BT,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FFFF",
            }, MainStyle.boxShadow,]}
                onLongPress={() => { }}
            >
                <Image
                    style={{ width: AVATA_SIZE, height: AVATA_SIZE }}
                    source={require('../../../../Assets/Icons/icon-service.png')}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ zIndex: 100, marginTop: 10, backgroundColor: 'rgba(0,0,0,0)', position: "absolute" }}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={points}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
                horizontal
            />
        </View>
    )
}