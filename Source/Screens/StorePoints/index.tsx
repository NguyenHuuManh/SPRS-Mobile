import { faCity, faPlus, faSortAlphaDownAlt, faSortAlphaUp, faToggleOn, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from "react-redux";
import { apiGetStore } from "../../ApiFunction/StorePoint";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import AppSelectTinh from "../../Components/AppSelectTinh";
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import { Field, Formik } from "formik";

import styles from "./styles";
import ContainerField from "../../Components/ContainerField";
import FilterComponent from "../../Components/FilterComponent";
import FilterForm from "./components/FilterForm";
const AVATA_SIZE = 60;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const [itemSelect, setItemSelect] = useState(null)
    const [points, setPoints] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current
    useEffect(() => { getPoint() }, [])
    const getPoint = () => {
        setIsVisible(true);
        apiGetStore().then((e) => {
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setPoints(e.data.obj);
                }
            }
        }).finally(() => {
            setIsVisible(false);
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
                        navigation.navigate("UpdateStorePoint", item);
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
            {/* <Loading isVisible={isVisible} /> */}
            <View style={{ height: "20%" }}>
                <HeaderContainer
                    isBackNavigate={"Home"}
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}

                />
            </View>
            <FilterForm />
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
                    refreshing={isVisible}
                    onRefresh={() => { getPoint() }}
                />
            </View>
        </View>
    )
}