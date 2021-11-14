import { faMapMarkedAlt, faMapMarker, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty } from "lodash";
import React, { createRef, useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { apiGetReliefPoint } from "../../../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../../../Components/ButtonCustom";
import HeaderContainer from "../../../../Components/HeaderContainer";
import { height } from "../../../../Helper/responsive";
interface Props {
    visible: boolean;
    setVisible: any;
    setText: any;
    map: any;
    setRegion?: any;
    region?: any
    setMarkerTo?: any;
}
export default (props: Props) => {
    const { visible, setVisible, setText, map, setMarkerTo, setRegion, region } = props
    const [itemSelected, setItemSelected] = useState<any>({});
    const inputRef = createRef<any>();
    useEffect(() => {
        if (isEmpty(itemSelected)) setText("");
        setText(itemSelected.label);
    }, [itemSelected])
    const [data, setData] = useState([])

    const getPoint = () => {
        // apiGetReliefPoint().then((e) => {
        //     if (e.status == 200) {
        //         if (e.data.code === "200") {
        //             setData(e.data.obj);
        //         }
        //     }
        // })
    }

    useEffect(() => {
        if (!visible) return;
        getPoint();
        if (inputRef?.current) {
            inputRef.current.focus();
        }

    }, [visible])
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", height: 50, alignItems: "center", borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                    setItemSelected(item);
                    const marker = {
                        latitude: Number(item.address.gps_lati),
                        longitude: Number(item.address.gps_long),
                        latitudeDelta: 0.006866,
                        longitudeDelta: 0.006866
                    }

                    map.animateToRegion(marker, 1000);
                    setRegion(marker)
                    setMarkerTo && setMarkerTo({
                        latitude: Number(marker.latitude),
                        longitude: Number(marker.longitude),
                    })
                    setVisible(false);
                }}
                key={item.id}
            >
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <Text style={{ paddingLeft: 10 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Modal visible={visible} animationType="fade">
            <View style={{ height: height * 0.1 }}>
                <HeaderContainer
                    centerEl={(
                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                            {/* <ModalSwipe /> */}
                            <TouchableOpacity onPress={() => { setVisible(true) }} style={{
                                padding: 5,
                                borderWidth: 1,
                                borderColor: "#FFF",
                                alignItems: "center",
                                borderRadius: 10,
                                flexDirection: "row",
                                width: "100%",
                                backgroundColor: "#FFF"
                            }}>
                                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={20} /></View>
                                <TextInput numberOfLines={1} style={{ height: 30, lineHeight: 40, color: "black", width: "80%", paddingTop: 0, textAlignVertical: "center", paddingBottom: 0 }} ref={inputRef} />
                            </TouchableOpacity>
                        </View>
                    )}
                    rightEL={(
                        <ButtonCustom title="Đóng" onPress={() => { setVisible(false) }}></ButtonCustom>
                    )}
                    flexLeft={0}
                    flexCenter={8}
                    flexRight={3}
                >
                </HeaderContainer >
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id + ""}
                renderItem={renderItem}
            />
        </Modal>
    )
}