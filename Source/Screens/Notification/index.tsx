import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateStatusNotification } from "../../ApiFunction/Notification";
import ORG from "../../Assets/Images/locationOrganization.svg";
import Relief from "../../Assets/Images/locationRelief.svg";
import SOS from "../../Assets/Images/locationSOS.svg";
import Store from "../../Assets/Images/locationStore.svg";
import HeaderContainer from "../../Components/HeaderContainer";
import { timeSince } from "../../Helper/FunctionCommon";
import { getStateRoute } from "../../Helper/RootNavigation";
import { badgeShowActions } from "../../Redux/Actions";
import { notificationRequest } from "../../Redux/Actions/NotificationActions";
import ActionTypes from "../../Redux/ActionTypes";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";

const page = 1;
const size = 10;
export default () => {
    const { pageSize, pageIndex, data, isRefesh, loading, type } = useSelector((state: RootState) => state.notificationReducer);
    const { object, totalRecord } = data
    const navigation = useNavigation<any>();
    const badgeShow = useSelector((state: RootState) => state.badgeReducer)
    const dispatch = useDispatch();
    const [onscroll, setOnscroll] = useState(false);
    useEffect(() => {
        dispatch(notificationRequest({ pageSize: 10, pageIndex: 1, isRefesh: false }));
        const willFocusSubscription = navigation.addListener('focus', () => {
            const routes = getStateRoute().routes;
            let checkReload = routes?.length <= 0 ? false : (routes[routes.length - 1].name == "NotificationDetail" || routes[routes.length - 1].name == "DetailPoint")
            if (checkReload) {
                if (routes[routes.length - 1].params?.item?.status !== 'read') {
                    checkReload = true;
                } else {
                    checkReload = false
                }
            }
            if (badgeShow.data.number > 0 || checkReload) {
                dispatch(notificationRequest({ pageSize: 10, pageIndex: 1, isRefesh: false }));
            }
        });
        return willFocusSubscription;
    }, []);

    useEffect(() => {
        if (badgeShow.data.number > 0 && type == ActionTypes.NOTIFICATION_SUCCESS) {
            dispatch(badgeShowActions.badgeRequest());
        }
    }, [data]);

    const updateNotificationStatus = (item) => {
        apiUpdateStatusNotification({ id: item.id, status: "read" }).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    console.log("read success");
                }
            } else {
                console.log("err");
            }
        })
    }

    const navigate = (item) => {
        if (['rp', 'st', 'sos', 'org'].includes(item.type)) {
            if (item.status !== 'read') {
                updateNotificationStatus(item);
            }
            navigation.push('DetailPoint', { point: { ...item.sender, type: item.type }, from: 'Notification' });
        } else {
            navigation.push('NotificationDetail', { item, from: 'Notification' });
        }
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item,
            ]} onPress={() => {
                navigate(item);
            }}>
                <View style={{ flex: 2, alignItems: "flex-start" }}>
                    <Image source={require("../../Assets/Images/logo.png")} style={{ width: 50, height: 50 }} resizeMode="cover" />
                </View>
                <View style={{ flex: 8, flexDirection: "column", justifyContent: "space-around" }}>
                    <Text style={{
                        fontWeight: "bold",
                        color: item.status !== 'read' ? "black" : 'rgba(173,173,173,1)'
                    }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {/* {item.type == 'ad' ? "Thông báo hệ thống" : item?.title} */}
                        {item?.title}
                    </Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                            color: item.status !== 'read' ? "black" : 'rgba(173,173,173,1)',
                            marginBottom: 10,
                            fontWeight: item.status == 'uncheck' ? "bold" : "normal",
                        }}>{item?.message}
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: -10 }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }}>
                            {item.type == 'rp' && (
                                <Relief fill={'#F4A921'} width={15} height={15} />
                            )}
                            {item.type == 'st' && (
                                <Store fill={'#F4A921'} width={15} height={15} />
                            )}
                            {item.type == 'sos' && (
                                <SOS fill={'#F4A921'} width={15} height={15} />
                            )}
                            {item.type == 'org' && (
                                <ORG fill={'#F4A921'} width={15} height={15} />
                            )}
                            {item.type == 'ad' && (
                                <Image source={require("../../Assets/Icons/alarm_clock_30px.png")} style={{ width: 12, height: 12 }} />
                            )}
                        </View>
                        < Text style={{
                            color: item.status !== 'read' ? "black" : 'rgba(173,173,173,1)',
                            fontWeight: item.status == 'uncheck' ? "bold" : "normal"
                        }}>{timeSince(item?.create_time)}</Text>
                    </View>
                </View>
            </TouchableOpacity >
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
    const handleLoadMore = () => {
        if (onscroll) {
            if (pageSize >= totalRecord) return;
            dispatch(notificationRequest({ pageSize: pageSize + size, pageIndex: 1, isRefesh: false }));
            setOnscroll(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={1}
                    flexCenter={10}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFF" }}>Thông báo</Text>
                        </View>
                    )}
                    flexLeft={1}
                />
            </View>
            <FlatList
                data={object}
                keyExtractor={(item => item.id + '')}
                renderItem={renderItem}
                refreshing={isRefesh}
                onRefresh={() => {
                    dispatch(notificationRequest({ pageSize: 10, pageIndex: 1, isRefesh: true }))
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{ paddingBottom: 10 }}
                onScroll={() => { setOnscroll(true) }}
            />
        </View>
    )
}