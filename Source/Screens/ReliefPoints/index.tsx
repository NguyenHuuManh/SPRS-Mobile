import { faPlus, faSortAlphaDownAlt, faSortAlphaUp, faToggleOn, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckBox from '@react-native-community/checkbox';
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { apiDeleteReliefPoint, apiGetReliefPoint, apiUpdateStatusReliefPoint } from "../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import FilterForm from "./components/FilterForm";
import styles from "./styles";
const AVATA_SIZE = 60;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default ({ navigation }) => {
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current
    const [pageSize, setPageSize] = useState({ pageSize: 5, pageIndex: 1 });
    const [totalPage, setTotalPage] = useState(3);
    const [isRefesh, setIsRefesh] = useState(false);
    const [body, setBody] = useState({
        sort: true,
        type: null,
        status: null,
    });

    useEffect(() => { getPoint() }, [pageSize]);

    const hidePoint = (param: { id: any, status: boolean }) => {
        apiUpdateStatusReliefPoint(param).then((response) => {
            console.log("responseHide", response);
            if (response.status == 200) {
                if (response.data.code == "200") {
                    getPoint();
                    return
                }
                Toast.show({
                    type: "error",
                    text1: response.data.message,
                    position: "top"
                });
                return
            }
            Toast.show({
                type: "error",
                text1: "Chức năng đang bảo trì",
                position: "top"
            });

        })
    }

    const deletePoint = (id) => {
        apiDeleteReliefPoint({ id: id }).then((response) => {
            if (response.status == 200) {
                if (response.data.code == "200") {
                    setIsRefesh(true);
                    setPageSize({ pageIndex: 1, pageSize: pageSize.pageIndex * 5 });
                    return
                }
                Toast.show({
                    type: "error",
                    text1: response.data.message,
                    position: "top"
                });
                return
            }
            Toast.show({
                type: "error",
                text1: "Chức năng đang bảo trì",
                position: "top"
            });
        })
    }
    const getPoint = () => {
        setLoading(true);
        const bodyRequest = {
            types: isNull(body.type) ? null : [body.type],
            status: body.status,
            sort: body.sort,
            pageSize: pageSize.pageSize,
            pageIndex: pageSize.pageIndex
        }
        apiGetReliefPoint(bodyRequest).then((e) => {
            if (e.status == 200) {
                if (e.data.code === "200") {
                    // points.push(e.data.obj)
                    if (isRefesh) {
                        setPoints(e.data.obj);
                        setIsRefesh(false);
                        return;
                    }
                    const arr = points.concat(e.data.obj);
                    setPoints(arr);
                } else {
                    Toast.show({
                        type: "error",
                        text1: "Chức năng đang bảo trì",
                        position: "top"
                    });
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: "Chức năng đang bảo trì",
                    position: "top"
                });
            }
        }).finally(() => { setLoading(false) })
    }
    const handleLoadMore = () => {
        console.log("sdfsd")
        if (pageSize.pageIndex >= totalPage) return;
        setPageSize({ ...pageSize, pageIndex: pageSize.pageIndex + 1 });
    }


    const renderLeftActions = (progress, dragX, item, onchage) => {
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
                            deletePoint(item.id);
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
                        renderRightActions={(x, y) => renderLeftActions(x, y, item, onchage)}
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
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}

                />
                {/* <ButtonCustom title="Thêm mới" onPress={() => { navigation.push("AddReliefPoint") }} /> */}
            </View>
            <FilterForm body={body} setBody={setBody} setPageSize={setPageSize} pageSize={pageSize} setIsRefesh={setIsRefesh} />
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
                    refreshing={loading}
                    onRefresh={() => {
                        setIsRefesh(true);
                        setPageSize({ pageIndex: 1, pageSize: 5 });
                    }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}