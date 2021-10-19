import { faMapMarkerAlt, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MainStyle } from "../../Style/main_style";
import style from "./style";
interface Props {
    onPress?: any;
    renderRightButton?: any;
}
export default (props: Props) => {
    const { onPress, renderRightButton } = props
    const [inputState, setInputState] = useState("");
    const [data, setData] = useState([]);
    const [itemSelect, setItemSelect] = useState<any>({})
    const [isShow, setIsShow] = useState(false)
    const dataDum = [
        {
            name: "Hà nội",
            id: 1,
        },
        {
            name: "Quảng ninh",
            id: 2,
        },
        {
            name: "Hải phòng",
            id: 3,
        },
        {
            name: "Hải dương",
            id: 4,
        },
        {
            name: "Lào cai",
            id: 5,
        },
        {
            name: "Yên bái",
            id: 6,
        },
        {
            name: "Lạng sơn",
            id: 7,
        },
        {
            name: "Lào cai",
            id: 8,
        },
        {
            name: "Yên bái",
            id: 9,
        },
        {
            name: "Lạng sơn",
            id: 10,
        },
    ]

    useEffect(() => {

    }, [inputState])

    useEffect(() => {
        if (isEmpty(itemSelect)) return
        setInputState(itemSelect.name)
    }, [itemSelect])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={style.item} onPress={() => {
                setIsShow(false)
                setItemSelect(item)
            }} key={item.id}>
                <View style={{ width: "10%" }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                </View>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[style.container]}>
            <View style={[MainStyle.boxShadow, MainStyle.flexRow, style.inputContainer]}>
                <View
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingLeft: 5,
                        width: "15%"
                    }}>
                    <FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={24} />
                </View>
                <View style={{ width: "70%" }}>
                    <TextInput
                        style={style.input}
                        onFocus={() => {
                            setData(dataDum)
                            setIsShow(true)
                        }}
                        value={inputState}
                    // onBlur={() => { setData([]) }}
                    />
                </View>
                <View style={{ width: "15%" }}>
                    {
                        renderRightButton()
                    }
                </View>

            </View>
            <Modal
                visible={isShow}
                transparent={true}
            // animationType="fade"
            >

                <TouchableOpacity
                    onPress={() => { setIsShow(false) }}
                    style={{ flex: 1, backgroundColor: 'rgba(250, 250, 250,0.1)', paddingTop: 60, paddingLeft: 5, paddingRight: 5 }}>
                    <TouchableWithoutFeedback
                        onPress={(e) => { e.preventDefault() }}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            scrollEnabled
                            style={[style.listItemContainer, MainStyle.boxShadow]}
                            ListFooterComponent={<View style={{ height: 20 }} />}
                        />
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

        </View >
    )
}