import { faDotCircle, faMapMarked, faPlus, faSortAlphaDownAlt, faSortAlphaUp, faToggleOn, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckBox from '@react-native-community/checkbox';
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Animated, Image, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { apiDeleteReliefPoint, apiGetReliefPoint, apiUpdateStatusReliefPoint } from "../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { addressToString } from "../../Helper/FunctionCommon";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import FilterForm from "./components/FilterForm";
import { AppColor } from '../../Helper/propertyCSS';
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import Draggable from "react-native-draggable";
const AVATA_SIZE = 80;
const Margin_BT = 5;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

const page = 1;
const size = 10;
const totalItem = 1000;

export default ({ navigation }) => {
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current
    const [pageSize, setPageSize] = useState({ pageSize: size, pageIndex: page });
    const [totalPage, setTotalPage] = useState(3);
    const [isRefesh, setIsRefesh] = useState(false);
    const [onScroll, setOnScroll] = useState(false);
    const [body, setBody] = useState({
        sort: true,
        type: null,
        status: null,
    });

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', (e) => {
            getPoint();
        });

        return willFocusSubscription;
    }, [])
    useEffect(() => { getPoint() }, [pageSize]);

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
            `${item.status ? "Bật điểm cứu trợ" : "Tắt điểm cứu trợ"}`,
            `${item.status ? "Hệ thống sẽ tự động cập nhật lại ngày giờ mở cửa của điểm cứu trợ là ngày giờ hiện tại " : "Hệ thống sẽ tự động cập nhật lại ngày giờ đóng cửa của điểm cứu trợ là ngày giờ hiện tại"}`,
            [
                {
                    text: 'đồng ý',
                    onPress: () => {
                        apiUpdateStatusReliefPoint({ id: item.id, status: item.status }).then((response) => {
                            if (response.status == 200) {
                                if (response.data.code == "200") {
                                    UpdatePoints(item, "Update");
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

    const deletePoint = (item) => {
        Alert.alert(
            "Xóa điểm cứu trợ",
            `Bạn có chắc chắn xóa ${item.name}`,
            [
                {
                    text: 'Xóa',
                    onPress: () => {
                        apiDeleteReliefPoint({ id: item.id }).then((response) => {
                            if (response.status == 200) {
                                if (response.data.code == "200") {
                                    UpdatePoints(item, "Delete");
                                    if ((pageSize.pageIndex * pageSize.pageSize) >= totalItem - 1) {
                                        setPageSize({ ...pageSize, pageSize: pageSize.pageSize - size });
                                        return;
                                    }
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
    const getPoint = () => {
        setLoading(true);
        const bodyRequest = {
            types: isNull(body.type) ? null : [body.type],
            status: isNull(body.status) ? 4 : body.status,
            sort: body.sort,
            pageSize: pageSize.pageSize,
            pageIndex: pageSize.pageIndex
        }
        apiGetReliefPoint(bodyRequest).then((e) => {
            console.log('eRelief', e);
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setPoints(e.data.obj);
                    setOnScroll(false);
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
        }).finally(() => {
            setLoading(false);
            if (isRefesh) setIsRefesh(false);
        })
    }
    const handleLoadMore = () => {
        if (onScroll) {
            if (pageSize.pageIndex * pageSize.pageSize >= totalItem) return;
            setPageSize({ ...pageSize, pageSize: pageSize.pageSize + size });
        }
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
                        style={{ backgroundColor: "#f7f7f7", width: "20%", justifyContent: "center", alignItems: "center", borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
                        onPress={(e) => {
                            e.preventDefault();
                            deletePoint(item);
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <FontAwesomeIcon icon={faTrashAlt} size={20} color="red" />
                        </Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: "#f7f7f7", width: "20%", justifyContent: "center", alignItems: "center", }}
                        onPress={(e: any) => {
                            e.preventDefault();
                            if (item.status + '' == '0') {
                                Alert.alert(
                                    "Bật điểm cứu trợ",
                                    `Thời gian kết thúc của điểm đã vượt quá ngày hiện tại, cập nhật lại thời gian nếu bạn muốn bật lại điểm`,
                                    [],
                                    { cancelable: true },
                                );
                                return;
                            }
                            if (item.status + '' == '2') {
                                Alert.alert(
                                    "Bật điểm cứu trợ",
                                    `Thời gian bắt đầu của điểm chưa đến ngày hiện tại, cập nhật lại thời gian nếu bạn muốn bật điểm`,
                                    [],
                                    { cancelable: true },
                                );
                                return;
                            }
                            ChangeStatusPoint({ ...item, status: item.status + '' == '3' ? 1 : 3 });
                        }}>
                        <Animated.Text
                            style={[
                                {
                                    transform: [{ translateX: trans }],
                                },
                            ]}>
                            <Switch value={item.status + '' == '1'}
                                disabled
                                thumbColor={item.status + '' == '3' ? 'gray' : '#0169ff'}
                                trackColor={{
                                    false: AppColor.CORLOR_TEXT,
                                    true: AppColor.BUTTON_MAIN
                                }}
                            ></Switch>
                        </Animated.Text>
                    </TouchableOpacity>
                    {item.status + '' == '1' && (
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
                                            type: "rp"
                                        },
                                        screen: "ReliefPoint"
                                    })
                            }}
                        >
                            <Animated.Text
                                style={[
                                    {
                                        transform: [{ translateX: trans }],
                                    },
                                ]}>
                                <FontAwesomeIcon icon={faMapMarked} size={20} color={AppColor.BUTTON_MAIN} />
                            </Animated.Text>
                        </TouchableOpacity>
                    )}
                </>

            </TouchableWithoutFeedback >
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
                MainStyle.boxShadowItem,
                { transform: [{ scale }], opacity }
                ]}
                key={item.id}
            >
                <TouchableOpacity onPress={() => {
                    if (!isOpen.status) {
                        navigation.push("UpdateReliefPoint", item);
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
                                    <View style={[styles.statusIcon, { backgroundColor: item.status + '' == '0' ? "orange" : item.status + '' == '1' ? "#32a864" : item.status == '2' ? "gray" : "red" }]}></View>
                                </View>
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="middle" style={{ color: AppColor.CORLOR_TEXT }}>Địa chỉ: {addressToString(item?.address?.subDistrict.name) + " - " + addressToString(item?.address?.district.name) + " - " + addressToString(item?.address?.city.name)}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/Icons/alarm_clock_30px.png")} style={{ width: 15, height: 15, marginRight: 5 }} />
                                <Text style={{ color: AppColor.CORLOR_TEXT }}>{(item.open_time + '').split(" ")[0] + " - " + (item.close_time + '').split(" ")[0]}</Text>
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
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    isBack
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Điểm cứu trợ</Text>
                        </View>
                    )}

                />
            </View>
            <FilterForm body={body} setBody={setBody} setPageSize={setPageSize} pageSize={pageSize} setIsRefesh={setIsRefesh} />
            <View style={{ height: "78%", marginTop: 10 }}>
                <Animated.FlatList
                    onScroll={() => {
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        );
                        setOnScroll(true);
                    }}
                    showsVerticalScrollIndicator={false}
                    data={points}
                    keyExtractor={(item) => item.id + 'Relef'}
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
                <Draggable
                    x={width * 0.75}
                    y={height * 0.7}
                    maxX={width * 0.85}
                    maxY={height * 0.75}
                    minX={20}
                    minY={20}
                    isCircle
                    onShortPressRelease={() => navigation.push("AddReliefPoint")}
                    z={200}
                >
                    <View style={[{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: AppColor.BUTTON_MAIN, borderRadius: 25 }, MainStyle.boxShadow]}>
                        <FontAwesomeIcon icon={faPlus} size={26} color="#FFFF" />
                    </View>
                </Draggable>
            </View>
        </View>
    )
}