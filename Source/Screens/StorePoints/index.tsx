import { faMapMarked, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { Animated, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { apiDeleteStore, apiGetStore } from "../../ApiFunction/StorePoint";
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
    const [isRefesh, setIsRefesh] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current
    const [pageSize, setPageSize] = useState({ pageSize: 5, pageIndex: 1 });
    const [totalPage, setTotalPage] = useState(3);
    const [body, setBody] = useState({
        sort: true,
        type: null,
        status: null,
    });

    const UpdatePoints = (item, type) => {
        const index = points.findIndex((e) => {
            return e.id == item.id
        });
        if (index >= 0 && type == "Update") {
            points[index] = item;
            setPoints([...points]);
        }
        if (index >= 0 && type == "Delete") {
            points.splice(index, 1);
            setPoints([...points]);
        }
    }

    useEffect(() => { getPoint() }, [pageSize]);
    const getPoint = () => {
        if (!isRefesh) {
            setIsRefesh(true);
        }
        apiGetStore().then((e) => {
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setPoints(e.data.obj);
                }
            }
        }).finally(() => {
            setIsRefesh(false);
        })
    }

    const deleteStore = (item) => {
        if (!item.id || isEmpty(item.id + '') || isNull(item.id)) return;
        if (!isRefesh) {
            setIsRefesh(true);
        }
        apiDeleteStore({ id: item.id }).then((res) => {
            if (res.status == 200) {
                if (res.data.code == '200') {
                    UpdatePoints(item, "Delete")
                }
            }
        })
    }

    const handleLoadMore = () => {
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
                            deleteStore(item);
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
                        style={{ backgroundColor: "#d3d3db", width: "20%", justifyContent: "center", alignItems: "center", }}
                        onPress={(e) => {
                            // deleteStore(item.id);
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <Switch thumbColor="blue" value={item.status} disabled></Switch>
                        </Animated.Text>
                    </RectButton>
                    <TouchableOpacity
                        style={{ backgroundColor: "#d3d3db", width: "20%", justifyContent: "center", alignItems: "center" }}
                        onPress={(e) => {
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <FontAwesomeIcon icon={faMapMarked} size={20} color="#FFFF" />
                        </Animated.Text>
                    </TouchableOpacity>
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
                MainStyle.boxShadowItem, { transform: [{ scale }], opacity }]}
                key={item.id}
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
                        renderRightActions={(x, y) => renderLeftActions(x, y, item, onchage)}
                        containerStyle={{ width: "100%", height: AVATA_SIZE, paddingLeft: 10 }}
                        onSwipeableClose={() => {
                            onchage(false)
                        }}
                    >
                        <View style={{ width: "50%", justifyContent: "space-around", height: AVATA_SIZE }}>
                            <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: item.status ? "#32a864" : "red" }}></View>
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
                    refreshing={isRefesh}
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