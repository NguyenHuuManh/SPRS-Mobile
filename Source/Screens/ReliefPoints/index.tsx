import { faPlus, faSortAlphaDownAlt, faSortAlphaUp, faToggleOn, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from "react-redux";
import { apiGetReliefPoint } from "../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
const AVATA_SIZE = 60;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const [itemSelect, setItemSelect] = useState(null)
    const [points, setPoints] = useState([])
    const scrollY = React.useRef(new Animated.Value(0)).current
    useEffect(() => { getPoint() }, [])
    const getPoint = () => {
        apiGetReliefPoint().then((e) => {
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setPoints(e.data.obj);
                }
            }
        })
    }
    const renderLeftActions = (progress, dragX, index, onchage) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        onchage(true);
        return (
            <TouchableWithoutFeedback
                onPress={(e) => { e.preventDefault() }}
            >
                <>
                    <TouchableOpacity
                        style={{ backgroundColor: "red", width: "20%", justifyContent: "center", alignItems: "center", borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
                        onPress={(e) => {
                            points.splice(index, 1);
                            setPoints([...points])
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <FontAwesomeIcon icon={faTrashAlt} size={20} color="#FFFF" />
                        </Animated.Text>
                    </TouchableOpacity>
                    <RectButton
                        style={{ backgroundColor: "blue", width: "20%", justifyContent: "center", alignItems: "center", }}
                        onPress={(e) => {
                            points.splice(index, 1);
                            setPoints([...points])
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <FontAwesomeIcon icon={faToggleOn} size={25} color="#FFFF" />
                        </Animated.Text>
                    </RectButton>
                </>

            </TouchableWithoutFeedback>
        );
    };

    const renderItem = ({ item, index }) => {

        const scale = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0]
        })

        const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
            outputRange: [1, 1, 1, 0]
        })

        let isOpen = {
            status: false,
            isFirst: true,
        };
        const onchage = (status) => {
            isOpen = {
                status: isOpen.isFirst ? false : status,
                isFirst: false
            };
        }

        return (

            <Animated.View
                style={[{
                    width: width * 0.9,
                    borderRadius: 10,
                    backgroundColor: "#FFF",
                    marginBottom: Margin_BT,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#FFFF",
                },
                MainStyle.boxShadow, { transform: [{ scale }], opacity }]}
                key={index}
            >
                <TouchableOpacity onPress={() => {
                    if (!isOpen.status) {
                        navigation.navigate("UpdateReliefPoint", item);
                    } else {
                        onchage(false);
                    }
                }} style={{ width: "100%" }}
                    delayPressIn={150}
                >
                    <Swipeable
                        renderRightActions={(x, y) => renderLeftActions(x, y, index, onchage)}
                        containerStyle={{ width: "100%", height: AVATA_SIZE, padding: 10 }}
                        onSwipeableClose={() => {
                            onchage(false)
                        }}
                    >
                        <View style={{ width: AVATA_SIZE, height: AVATA_SIZE }}>
                            <Text>{item.name}</Text>
                        </View>
                    </Swipeable>
                </TouchableOpacity>
            </Animated.View >

        )
    }

    return (
        <View style={[styles.container]}>
            <View style={{ height: "20%" }}>
                <HeaderContainer
                    isBackNavigate={"Home"}
                    // centerEl={(
                    //     <View style={{ width: "100%" }}>
                    //         <TextInput style={{ backgroundColor: "#FFF", borderRadius: 10 }} />
                    //     </View>
                    // )}
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}

                />
                {/* <ButtonCustom title="Thêm mới" onPress={() => { navigation.push("AddReliefPoint") }} /> */}
            </View>
            <View style={{ height: "15%", width: "100%" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", height: "50%", alignItems: "center", backgroundColor: "red", paddingLeft: 5, paddingRight: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Danh sách điểm cứu trợ</Text>
                    <ButtonCustom onPress={() => { navigation.push("AddReliefPoint") }} ><FontAwesomeIcon icon={faPlus} /></ButtonCustom>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", height: "50%", alignItems: "center", backgroundColor: "pink" }}>
                    <CheckBox
                        value={true}
                    />
                    <CheckBox
                        value={true}
                    />
                    <CheckBox
                        value={true}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <FontAwesomeIcon icon={faSortAlphaUp} />
                        <FontAwesomeIcon icon={faSortAlphaDownAlt} />
                    </View>
                </View>
            </View>
            <View style={{ height: "55%", marginTop: 10 }}>
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
        </View>
    )
}