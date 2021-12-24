import { faMapMarked, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Animated, Image, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Draggable from "react-native-draggable";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Toast from "react-native-toast-message";
import { apiDeleteStore, apiGetStore, apiUpdateStatus } from "../../ApiFunction/StorePoint";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { addressToString } from "../../Helper/FunctionCommon";
import { AppColor } from "../../Helper/propertyCSS";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import FilterForm from "./components/FilterForm";
import styles from "./styles";

const AVATA_SIZE = 80;
const Margin_BT = 5;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

const page = 0;
const size = 10;
export default ({ navigation }) => {
    const [points, setPoints] = useState([]);
    const [isRefesh, setIsRefesh] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current
    const [pageSize, setPageSize] = useState({ pageSize: size, pageIndex: page });
    const [isFirst, setIsFirst] = useState(true);
    const [loading, setLoading] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [body, setBody] = useState({
        sort: true,
        type: null,
        status_store: 3,
    });

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            getPoint();
        });
        return willFocusSubscription;
    }, [])

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
    const ChangeStatusPoint = (item) => {
        Alert.alert(
            `${item.status != 2 ? "Mở lại cửa hàng" : "Đóng cửa hàng"}`,
            `${item.status != 2 ? "Ban có chắc chắn mở lại cửa hàng" : "Bạn có chắc chắn đóng cửa cửa hàng"}`,
            [
                {
                    text: 'đồng ý',
                    onPress: () => {
                        apiUpdateStatus(item).then((response) => {
                            console.log("response", response)
                            if (response.status == 200) {
                                if (response.data.code == "200") {
                                    UpdatePoints(response.data.obj, "Update");
                                    setPageSize({ ...pageSize });
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
                },
                {
                    text: 'Hủy',
                    onPress: () => { },
                },
            ],
            { cancelable: true },
        );

    }

    useEffect(() => {
        getPoint();
    }, [pageSize]);
    const getPoint = () => {
        const bodyRequest = {
            // types: isNull(body.type) ? null : [body.type],
            type: isNull(body.type) ? 0 : body.type,
            status_store: isNull(body.status_store) ? 3 : body.status_store,
            sort: body.sort,
            pageSize: pageSize.pageSize,
            pageIndex: pageSize.pageIndex
        }
        apiGetStore(bodyRequest).then((e) => {
            console.log("resGetStore", e);
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setPoints(e.data.obj.stores);
                    setTotalItem(e.data.obj.totalItems)
                }
            }
        }).finally(() => {
            setLoading(false);
            if (isRefesh) setIsRefesh(false);
            if (isFirst) setIsFirst(false);
        })
    }

    const deleteStore = (item) => {
        if (!item.id || isEmpty(item.id + '') || isNull(item.id)) return;
        Alert.alert(
            `Xóa cửa hàng`,
            `Ban có chắc chắn xóa cửa hàng ${item.name}`,
            [
                {
                    text: 'đồng ý',
                    onPress: () => {
                        apiDeleteStore({ id: item.id }).then((res) => {
                            console.log('delete', res)
                            if (res.status == 200) {
                                if (res.data.code == '200') {
                                    UpdatePoints(item, "Delete");
                                    if ((pageSize.pageIndex * pageSize.pageSize) >= totalItem - 1) {
                                        setPageSize({ ...pageSize, pageSize: pageSize.pageSize - size });
                                        return;
                                    }
                                    setPageSize({ ...pageSize });
                                }
                            } else {
                                Toast.show({
                                    type: "error",
                                    text1: 'Hệ thống đang bảo trì',
                                    position: "top"
                                })
                            }
                        })
                    }
                },
                {
                    text: 'Hủy',
                    onPress: () => { },
                },
            ],
            { cancelable: true },
        );

    }

    const handleLoadMore = () => {
        if (pageSize.pageIndex * pageSize.pageSize >= totalItem) return;
        setPageSize({ ...pageSize, pageSize: pageSize.pageSize + size });
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
                style={{ backgroundColor: '#f7f7f7' }}
            >
                <>
                    <TouchableOpacity
                        style={{ backgroundColor: "#f7f7f7", width: "20%", justifyContent: "center", alignItems: "center", borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
                        onPress={(e) => {
                            deleteStore(item);
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <FontAwesomeIcon icon={faTrashAlt} size={20} color='red' />
                        </Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: "#f7f7f7", width: "20%", justifyContent: "center", alignItems: "center", }}
                        onPress={(e: any) => {
                            e.preventDefault();
                            ChangeStatusPoint({ ...item, status: item.status != 2 ? 2 : 0 });
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <Switch thumbColor={'#0169ff'} value={item.status != 2}
                                disabled
                                trackColor={{
                                    false: AppColor.CORLOR_TEXT,
                                    true: AppColor.BUTTON_MAIN
                                }}
                            >
                            </Switch>
                        </Animated.Text>
                    </TouchableOpacity>
                    {(item?.status == 0 || item?.status == 1) && (
                        <TouchableOpacity
                            style={{ backgroundColor: "#f7f7f7", width: "20%", justifyContent: "center", alignItems: "center" }}
                            onPress={(e) => {
                                e.preventDefault();
                                navigation.navigate("MapCluser",
                                    {
                                        toLocation:
                                        {
                                            id: item.id,
                                            location: {
                                                latitude: Number(item.address.GPS_lati),
                                                longitude: Number(item.address.GPS_long)
                                            },
                                            type: "st"
                                        },
                                        screen: "StorePoints"
                                    })
                            }}>
                            <Animated.Text
                                style={[
                                    {
                                        transform: [{ translateX: trans }],
                                    },
                                ]}>
                                <FontAwesomeIcon icon={faMapMarked} size={23} color={AppColor.BUTTON_MAIN} />
                            </Animated.Text>
                        </TouchableOpacity>
                    )}
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
                        navigation.push("UpdateStorePoint", item);
                    } else {
                        onchage(false);
                    }
                }} style={{ width: "100%" }}
                    delayPressIn={150}
                >
                    <Swipeable
                        renderRightActions={(x, y) => renderLeftActions(x, y, item, onchage)}
                        containerStyle={{ width: "100%", height: AVATA_SIZE, paddingLeft: 10, paddingRight: 10 }}
                        onSwipeableClose={() => {
                            onchage(false)
                        }}
                    >
                        <View style={{ width: "100%", height: AVATA_SIZE, justifyContent: "space-around" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ width: "50%", fontSize: 12, fontWeight: "bold" }}>{item.name}</Text>
                                <View style={{ width: "50%", alignItems: "flex-end", paddingRight: 5, justifyContent: "center" }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: item.status == 0 ? "#32a864" : item.status == 1 ? "#F6BB57" : "red" }} />
                                </View>
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="middle" style={{ color: AppColor.CORLOR_TEXT }}>Địa chỉ: {addressToString(item?.address?.subDistrict.name + '') + " - " + addressToString(item?.address?.district.name + '') + " - " + addressToString(item?.address?.city.name + '')}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/Icons/alarm_clock_30px.png")} style={{ width: 15, height: 15, marginRight: 5 }} />
                                <Text style={{ color: AppColor.CORLOR_TEXT }}>{(item.open_time + '')?.split(" ")?.[0] + " - " + (item.close_time + '')?.split(" ")?.[0]}</Text>
                            </View>
                        </View>
                    </Swipeable>
                </TouchableOpacity>
            </Animated.View >
        )
    }


    const renderFooter = () => {
        if (loading) {
            return (
                <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={[{ width: 30, height: 30, borderRadius: 30, backgroundColor: "#FFFF", justifyContent: "center", alignItems: "center", marginBottom: 5 }, MainStyle.boxShadowItem]}>
                        <ActivityIndicator size="small" color="black" />
                    </View>
                </View>
            )
        } else {
            return null
        }

    }

    return (
        <View style={[styles.container]}>
            {/* <View style={{ position: "absolute", right: "5%", bottom: "10%", zIndex: 100 }}>
                <ButtonCustom
                    onPress={() => { navigation.push("AddStorePoint") }}
                    styleContain={{ borderRadius: 50, width: 50, height: 50, justifyContent: "center", alignItems: "center", backgroundColor: AppColor.MAIN_COLOR, }}
                >
                    <FontAwesomeIcon icon={faPlus} size={26} color="#FFFF" />
                </ButtonCustom>
            </View> */}
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    isBack
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Cửa hàng của bạn</Text>
                        </View>
                    )}

                />
            </View>
            <FilterForm body={body} setBody={setBody} setPageSize={setPageSize} pageSize={pageSize} setIsRefesh={setIsRefesh} />
            <View style={{ height: height * 0.78, marginTop: 10 }}>
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
                        setPageSize({ pageIndex: page, pageSize: size });
                    }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={renderFooter}
                />
            </View>
            <Draggable
                x={width * 0.8}
                y={height * 0.85}
                maxX={width * 0.9}
                maxY={height * 0.95}
                minX={20}
                minY={20}
                isCircle
                onShortPressRelease={() => navigation.push("AddStorePoint")}
                z={200}
            >
                <View style={[{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: AppColor.BUTTON_MAIN, borderRadius: 25 }, MainStyle.boxShadow]}>
                    <FontAwesomeIcon icon={faPlus} size={26} color="#FFFF" />
                </View>
            </Draggable>
        </View>
    )
}