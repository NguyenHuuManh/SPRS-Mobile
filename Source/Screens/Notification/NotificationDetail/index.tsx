import React, { useEffect } from "react";
import { FlatList, Image, Modal, Text, View } from "react-native";
import { AppColor } from "../../../Helper/propertyCSS";
import styles from "./styles";
import { useRoute } from "@react-navigation/core";
import HeaderContainer from "../../../Components/HeaderContainer";
import { isEmpty } from "lodash";
import { apiUpdateStatusNotification } from "../../../ApiFunction/Notification";
import { useDispatch } from "react-redux";
import { badgeShowActions } from "../../../Redux/Actions";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
interface Props {
    visible: boolean;
    setVisible: any;
    item: any;
    setData: any;
    data: any;
}
export default (props: Props) => {
    const { visible, setVisible, item, setData, data } = props
    const dispatch = useDispatch();

    const UpdateData = (item) => {
        const index = data.findIndex((e) => {
            return e.id == item.id
        });
        if (index >= 0) {
            data[index] = item;
            setData([...data]);
        }
    }

    useEffect(() => {
        if (isEmpty(item) || item.status == 'read') return;
        apiUpdateStatusNotification({ id: item.id, status: "read" }).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    dispatch(badgeShowActions.badgeRequest());
                    UpdateData({ ...item, status: 'read' });
                }
            } else {
                console.log("err");
            }
        })
    }, [item])

    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                <View style={{ height: "7%" }}>
                    <HeaderContainer
                        flexRight={0}
                        flexCenter={10}
                        leftView
                        iconLeft={faChevronLeft}
                        leftOnpress={() => { setVisible(false) }}
                        centerEl={(
                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 20, color: "#FFFF" }}>Thông báo</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.header}>
                    <Image source={require("../../../Assets/Images/sos.png")} style={{ width: 50, height: 50, marginRight: 10 }} resizeMode="cover" />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold" }}>{item?.sender?.name}</Text>
                        <Text style={{ color: AppColor.CORLOR_TEXT }}>{item?.time}</Text>
                    </View>
                </View>
                <View style={styles.contents}>
                    <Text style={{ color: AppColor.CORLOR_TEXT }}>{item?.message}</Text>
                </View>
            </View>
        </Modal>
    )
}