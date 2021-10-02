import React, { useState } from "react";
import { Animated, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import Swipeout from 'react-native-swipeout';
const AVATA_SIZE = 100;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default ({ navigation }) => {
    // const navigation = useNavigation()
    const [itemSelect, setItemSelect] = useState(null)
    const [points, setPoints] = useState(
        [{ name: "Điểm cứu trợ", id: "1" }, { name: "Thực phẩm", id: "2" }, { name: "Cắt tóc", id: "3" }, { name: "Điểm cứu trợ", id: "4" }, { name: "Thực phẩm", id: "5" }, { name: "Cắt tóc", id: "6" }, { name: "Điểm cứu trợ", id: "7" }, { name: "Thực phẩm", id: "8" }, { name: "Cắt tóc", id: "9" }, { name: "Điểm cứu trợ", id: "10" }, { name: "Thực phẩm", id: "11" }, { name: "Cắt tóc", id: "12" }]
    )
    const scrollY = React.useRef(new Animated.Value(0)).current

    const renderItem = ({ item, index }) => {

        const scale = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0]
        })

        const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
            outputRange: [1, 1, 1, 0]
        })

        return (

            <Animated.View style={[{
                width: width * 0.9,
                borderRadius: 10,
                backgroundColor: "#FFF",
                marginBottom: Margin_BT,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FFFF",
            }, MainStyle.boxShadow, { transform: [{ scale }], opacity }]}>
                <Swipeout
                    right={[
                        {
                            onPress: () => { points.splice(index, 1) },
                            text: 'Button',
                        }
                    ]}
                    style={{ backgroundColor: "#FFF", width: "100%", borderRadius: 10, paddingLeft: 10 }}
                    autoClose
                    onClose={() => {
                        if (itemSelect != null) {
                            setItemSelect(null);
                        }
                    }}
                    onOpen={() => {
                        setItemSelect(item)
                    }}

                >
                    <View style={{ width: AVATA_SIZE, height: AVATA_SIZE }}>
                        <Text>{item.name}</Text>
                    </View>
                </Swipeout>
            </Animated.View>

        )
    }

    return (
        <View style={[styles.container]}>
            <View style={{ height: height * 0.1 }}>
                <HeaderContainer
                    centerEl={(
                        <View style={{ width: "100%" }}>
                            <TextInput style={{ backgroundColor: "#FFF", borderRadius: 10 }} />
                        </View>
                    )}
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}

                />
            </View>
            <View style={{ height: "65%", marginTop: 10 }}>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    showsVerticalScrollIndicator={false}
                    data={points}
                    keyExtractor={({ id }) => id}
                    renderItem={renderItem}
                    style={{ paddingBottom: 50 }}
                />
            </View>

            <ButtonCustom title="Thêm mới" onPress={() => { navigation.push("AddLocation") }} />
        </View>
    )
}