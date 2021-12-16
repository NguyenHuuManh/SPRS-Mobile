import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { AppColor } from "../../Helper/propertyCSS";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/core";
import HeaderContainer from "../../Components/HeaderContainer";
import { isEmpty } from "lodash";
import { apiGetNotificationId, apiUpdateStatusNotification } from "../../ApiFunction/Notification";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { badgeShowActions } from "../../Redux/Actions";
export default () => {
    const { params } = useRoute<any>();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const [data, setData] = useState<any>({});

    const getNotificationId = (id) => {
        apiGetNotificationId(id).then((e) => {
            console.log("Notification", e)
            if (e.status == 200) {
                if (e.data.code == '200') {
                    setData(e.data.obj);
                } else {

                }
            }
        })
    }

    useEffect(() => {
        if (isEmpty(params.item)) return;
        console.log("onchangeReadiing", params.item)
        getNotificationId(params.item.id);
        if (params.item.status == 'read') return;
        apiUpdateStatusNotification({ id: params.item.id, status: "read" }).then((e) => {
            console.log("readding", e);
            if (e.status == 200) {
                if (e.data.code == '200') {
                    dispatch(badgeShowActions.badgeRequest());
                }
            } else {
                console.log("err");
            }
        })
    }, [params]);
    return (
        <View style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={1}
                    flexCenter={10}
                    flexLeft={1}
                    leftView
                    iconLeft={faChevronLeft}
                    leftOnpress={() => {
                        if (params?.isBack == true) {
                            navigation.goBack();
                        } else {
                            // navigation.navigate("Notification");
                            navigation.goBack();
                        }
                    }}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Thông báo</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.header}>
                <Image source={require("../../Assets/Images/logo.png")} style={{ width: 50, height: 50 }} resizeMode="cover" />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold" }}>Thông báo hệ thống</Text>
                    <Text style={{ color: AppColor.CORLOR_TEXT }}>{data?.create_time}</Text>
                </View>
            </View>
            <View style={styles.contents}>
                <Text style={{ color: AppColor.CORLOR_TEXT }}>{data?.message}</Text>
            </View>
        </View>
    )
}