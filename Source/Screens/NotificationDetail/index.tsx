import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { AppColor } from "../../Helper/propertyCSS";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/core";
import HeaderContainer from "../../Components/HeaderContainer";
import { isEmpty } from "lodash";
import { apiUpdateStatusNotification } from "../../ApiFunction/Notification";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { badgeShowActions } from "../../Redux/Actions";
export default () => {
    const { params } = useRoute<any>();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isEmpty(params.item) || params.item.status == 'read') return;
        apiUpdateStatusNotification({ id: params.item.id, status: "read" }).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    dispatch(badgeShowActions.badgeRequest());
                }
            } else {
                console.log("err");
            }
        })
    }, [params])
    return (
        <View style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={0}
                    flexCenter={10}
                    leftView
                    iconLeft={faChevronLeft}
                    leftOnpress={() => {
                        if (params?.isBack == true) {
                            navigation.goBack();
                        } else {
                            navigation.navigate("Notification", { reload: true });
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
                <Image source={require("../../Assets/Images/sos.png")} style={{ width: 50, height: 50, marginRight: 10 }} resizeMode="cover" />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold" }}>{params.item.sender.name}</Text>
                    <Text style={{ color: AppColor.CORLOR_TEXT }}>{params.item.create_time}</Text>
                </View>
            </View>
            <View style={styles.contents}>
                <Text style={{ color: AppColor.CORLOR_TEXT }}>{params.item.message}</Text>
            </View>
        </View>
    )
}