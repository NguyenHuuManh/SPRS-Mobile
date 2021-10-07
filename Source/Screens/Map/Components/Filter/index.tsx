import React from "react";
import { Animated, FlatList, Image, View } from "react-native";
import { MainStyle } from "../../../../Style/main_style";
import style from "./style";

const AVATA_SIZE = 25;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default () => {
    const scrollY = React.useRef(new Animated.Value(0)).current
    const points = [
        { name: "Điểm cứu trợ", id: "1" }, { name: "Thực phẩm", id: "2" }, { name: "Cắt tóc", id: "3" }, { name: "Điểm cứu trợ", id: "4" }, { name: "Thực phẩm", id: "5" }, { name: "Cắt tóc", id: "6" }, { name: "Điểm cứu trợ", id: "7" }, { name: "Thực phẩm", id: "8" }, { name: "Cắt tóc", id: "9" }, { name: "Điểm cứu trợ", id: "10" }, { name: "Thực phẩm", id: "11" }, { name: "Cắt tóc", id: "12" }
    ]
    const renderItem = ({ item, index }) => {

        const scale = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, -1]
        })

        const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
            outputRange: [1, 1, 1, -1]
        })

        return (
            <Animated.View style={[{
                width: 30,
                borderRadius: 10,
                backgroundColor: "red",
                marginBottom: Margin_BT,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FFFF",
            }, MainStyle.boxShadow, { transform: [{ scale }], opacity }]}>
                <Image
                    // style={[MainStyle.icon]}
                    style={{ width: AVATA_SIZE, height: AVATA_SIZE }}
                    source={require('../../../../Assets/Icons/icon-service.png')}
                    resizeMode="stretch"
                />
            </Animated.View>
        )
    }
    return (
        <View style={[style.container]}>
            <Animated.FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                showsVerticalScrollIndicator={false}
                data={points}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
            />
        </View>
    )
}