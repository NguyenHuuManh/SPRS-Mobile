import React, { createRef, useRef, useState } from "react";
import { Animated, Button, FlatList, Image, View } from "react-native";
import { MainStyle } from "../../../../Style/main_style";
import style from "./style";
import { Transition, Transitioning } from "react-native-reanimated"
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
    const ref = React.useRef<any>();
    const [show, setShow] = useState(false);
    const transition = () => {
        return (
            <Transition.Together>
                <Transition.In type="fade" durationMs={400} />
                <Transition.Change />
                <Transition.Out type="fade" durationMs={400} />
            </Transition.Together>
        )
    }
    return (
        <Transitioning.View
            style={[style.container]}
            transition={transition}
            ref={ref}
        >
            <TouchableOpacity
                onPress={() => {
                    setShow(!show);
                    ref.current.animateNextTransition();
                }}
            >
                <FontAwesomeIcon icon={faFilter} />
            </TouchableOpacity>
            {show && (
                <View style={{ height: 200 }}>
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
            )}
        </Transitioning.View>
    )
}