import { faMapMarkedAlt, faMapMarker, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonCustom from "../../../../Components/ButtonCustom";
import HeaderContainer from "../../../../Components/HeaderContainer";
import { height } from "../../../../Helper/responsive";
interface Props {
    visible: boolean;
    setVisible: any;
    setText: any;
}
export default (props: Props) => {
    const { visible, setVisible, setText } = props
    const [itemSelected, setItemSelected] = useState<any>({});
    useEffect(() => {
        if (isEmpty(itemSelected)) setText("");
        setText(itemSelected.label);
    }, [itemSelected])
    const [data, setData] = useState([
        {
            value: 1,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 2,
            label: "Thạch hòa thạch thất hà nội"
        },
        {
            value: 3,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 4,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 5,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 6,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 7,
            label: "Thạch hòa thạch thất hà nội"
        },
        {
            value: 8,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 9,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 10,
            label: "Minh Đức tứ kỳ hải dương xịn"
        }, {
            value: 11,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 12,
            label: "Minh Đức tứ kỳ hải dương"
        },
        {
            value: 13,
            label: "Minh Đức tứ kỳ hải dương xịn"
        }
    ])
    const renderItem = ({ item, index }) => {
        console.log("item", item);
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", height: 50, alignItems: "center", borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                    setItemSelected(item);
                    setVisible(false)
                }}
            >
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <Text style={{ paddingLeft: 10 }}>{item.label}</Text>
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
                                <TextInput numberOfLines={1} style={{ height: 30, lineHeight: 40, color: "black", width: "80%", paddingTop: 0, textAlignVertical: "center", paddingBottom: 0 }} />
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
                keyExtractor={(item) => item.value + ""}
                renderItem={renderItem}
            />
        </Modal>
    )
}