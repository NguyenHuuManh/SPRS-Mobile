import { faBellSlash, faMapMarked, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { apiGetSubcribleStore } from "../../ApiFunction/StorePoint";
import HeaderContainer from "../../Components/HeaderContainer";
import { addressToString } from "../../Helper/FunctionCommon";
import { AppColor } from "../../Helper/propertyCSS";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";

const AVATA_SIZE = 70;
const Margin_BT = 5;
const ITEM_SIZE = AVATA_SIZE + Margin_BT
export default ({ navigation }) => {
    const [data, setData] = useState<any>({});
    const [pageSize, setPageSize] = useState({ pageSize: 5, pageIndex: 1 });
    const [totalPage, setTotalPage] = useState(3);
    const [isRefesh, setIsRefesh] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current
    const getPoint = () => {
        apiGetSubcribleStore().then((e) => {
            console.log("eSubcrible", e)
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setData(e.data.obj);
                }
            }
        })
    }

    useEffect(() => {
        // getPoint();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getPoint();
        });

        return willFocusSubscription;
    }, [])


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
                        style={{ backgroundColor: "#f7f7f7", width: "20%", justifyContent: "center", alignItems: "center" }}
                        onPress={(e) => {
                            navigation.navigate("MapCluser", {
                                toLocation: {
                                    id: item.id,
                                    location: {
                                        latitude: Number(item.address.GPS_lati),
                                        longitude: Number(item.address.GPS_long)
                                    },
                                    type: "st"
                                },
                                screen: "SubcribeList"
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
                MainStyle.boxShadowItem,
                { transform: [{ scale }], opacity }
                ]}
                key={item.id}
            >
                <TouchableOpacity onPress={() => {
                    if (!isOpen.status) {
                        navigation.navigate("DetailPoint", { point: { id: item.id, type: 'st' }, from: "SubcribeList" });
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
                        <View style={{ width: "100%", height: AVATA_SIZE, justifyContent: "space-around" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ width: "50%", fontSize: 12, fontWeight: "bold" }}>{item?.name}</Text>
                                <View style={{ width: "50%", alignItems: "flex-end", paddingRight: 5, justifyContent: "center" }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: item?.status == 0 ? "#32a864" : item?.status == 1 ? "#F6BB57" : "red" }} />
                                </View>
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="middle" style={{ color: AppColor.CORLOR_TEXT }}>Địa chỉ: {addressToString(item?.address?.subDistrict.name + '') + " - " + addressToString(item?.address?.district.name + '') + " - " + addressToString(item?.address?.city.name + '')}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../../Assets/Icons/alarm_clock_30px.png")} style={{ width: 15, height: 15, marginRight: 5 }} />
                                <Text style={{ color: AppColor.CORLOR_TEXT }}>{(item?.open_time + '')?.split(" ")?.[0] + " - " + (item?.close_time + '')?.split(" ")?.[0]}</Text>
                            </View>
                        </View>
                    </Swipeable>
                </TouchableOpacity>
            </Animated.View >
        )
    }
    const handleLoadMore = () => {
        if (pageSize.pageIndex >= totalPage) return;
        setPageSize({ ...pageSize, pageIndex: pageSize.pageIndex + 1 });
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: height * 0.07 }}>
                <HeaderContainer
                    isBackNavigate={"DrawScreen"}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Cửa hàng yêu thích</Text>
                            {/* <FontAwesomeIcon icon={faStore} style={{ marginLeft: 10 }} color="#f57842" size={26} /> */}
                        </View>
                    )}
                    flexLeft={1}
                    flexCenter={8}
                    flexRight={1}
                >
                </HeaderContainer >
            </View>
            <View style={{ height: "97%", marginTop: 10, alignItems: "center" }}>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    showsVerticalScrollIndicator={false}
                    data={data?.user_subcribe}
                    keyExtractor={(item: any) => item.id}
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