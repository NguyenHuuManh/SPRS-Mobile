import { useNavigation, useRoute } from "@react-navigation/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllNotification, apiUpdateStatusNotification } from "../../ApiFunction/Notification";
import ORG from "../../Assets/Images/locationOrganization.svg";
import Relief from "../../Assets/Images/locationRelief.svg";
import SOS from "../../Assets/Images/locationSOS.svg";
import Store from "../../Assets/Images/locationStore.svg";
import HeaderContainer from "../../Components/HeaderContainer";
import { AppColor } from "../../Helper/propertyCSS";
import { badgeShowActions } from "../../Redux/Actions";
import ActionTypes from "../../Redux/ActionTypes";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";

const page = 1;
const size = 10;
export default () => {
    const [pageSize, setPageSize] = useState({ pageSize: 10, pageIndex: 1 });
    const [data, setData] = useState<any>([]);
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const [totalItem, setTotalItem] = useState(0);
    const badgeShow = useSelector((state: RootState) => state.badgeReducer)
    const focusNotificationTab = useSelector((state: RootState) => state.forcusNotificationReducer);
    const [isRefesh, setIsRefesh] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [onscroll, setOnscroll] = useState(false);
    useEffect(() => {
        if (focusNotificationTab.status && badgeShow.type == ActionTypes.BADGE_REQUEST) {
            setPageSize({ ...pageSize });
        }
    }, [badgeShow]);

    useEffect(() => {
        if (focusNotificationTab.status && badgeShow.data.number > 0 && badgeShow.type == ActionTypes.BADGE_RESULTS) {
            setPageSize({ ...pageSize });
        }
    }, [focusNotificationTab])

    const getNotification = () => {
        setLoading(true);
        apiGetAllNotification(pageSize).then((res) => {
            if (res.status == 200) {
                if (res.data.code == '200') {
                    setData(res.data.obj.object);
                    setTotalItem(res.data.obj.totalRecord);
                    if (badgeShow.data.number > 0) {
                        dispatch(badgeShowActions.badgeRequest())
                    }
                    setOnscroll(false);
                    console.log("resNotification", res);
                }
            }
        }).finally(() => {
            setLoading(false);
            if (isRefesh) setIsRefesh(false);
        })
    }
    useEffect(() => {
        getNotification();
    }, [pageSize]);


    const updateNotificationStatus = (item) => {
        apiUpdateStatusNotification({ id: item.id, status: "read" }).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    console.log("read success");
                    setPageSize({ ...pageSize });
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
            navigation.navigate('DetailPoint', { point: { ...item.sender, type: item.type }, from: 'Notification' });
        } else {
            navigation.navigate('NotificationDetail', { item, from: 'Notification' });
        }
    }

    const renderLable = (timeString) => {
        const arrTime = timeString.split(' ');
        if (moment(moment(arrTime[0]).valueOf()).isSame(moment().valueOf())) {
            return arrTime[1];
        } else {
            return arrTime[0];
        }
    }
    // console.log("data", data)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, { backgroundColor: item.status !== 'read' ? "#F6BB55" : "#FFF" }]} onPress={() => {
                navigate(item);
            }}>
                <View style={{ flex: 2, alignItems: "flex-start" }}>
                    <Image source={require("../../Assets/Images/logo.png")} style={{ width: 50, height: 50 }} resizeMode="cover" />
                </View>
                <View style={{ flex: 8, flexDirection: "column", justifyContent: "space-around" }}>
                    <Text style={{ fontWeight: "bold" }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >{item.type == 'ad' ? "Thông báo hệ thống" : item?.sender?.name}</Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                            color: item.status == 'uncheck' ? "#000" : AppColor.CORLOR_TEXT, marginBottom: 10,
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
                            color: item.status == 'uncheck' ? "#000" : AppColor.CORLOR_TEXT,
                            fontWeight: item.status == 'uncheck' ? "bold" : "normal"
                        }}>{renderLable(item?.create_time)}</Text>
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
            setPageSize({ ...pageSize, pageSize: pageSize.pageSize + size });
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
                data={data}
                keyExtractor={(item => item.id + '')}
                renderItem={renderItem}
                refreshing={isRefesh}
                onRefresh={() => {
                    setIsRefesh(true);
                    setPageSize({ pageIndex: page, pageSize: size });
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
        </View>
    )
}