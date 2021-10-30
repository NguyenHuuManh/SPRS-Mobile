import { faMapMarkerAlt, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { debounce, isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Toast from 'react-native-toast-message';
import { apiPlaceAutoComplete, apiPlaceDetailById } from '../../ApiFunction/PlaceAPI';
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
    const callAutoComplete = (key) => {
        apiPlaceAutoComplete(key).then((e) => {
            if (e.data.status == "OK") {
                setData(e.data.predictions);
            } else {
                Toast.show({
                    type: "error",
                    text1: e.data.status,
                    position: "top"
                })
            }
        })
    }

    const debounceDropDown = useCallback(debounce((nextValue) => callAutoComplete(nextValue), 100), [])

    function handleInputOnchange(e) {
        setInputState(e);
        debounceDropDown(e);
    }

    useEffect(() => {
        if (isEmpty(data)) setIsShow(false)
        if (!isShow) setIsShow(true);
    }, [data])

    useEffect(() => {
        if (isEmpty(itemSelect)) return
        setInputState(itemSelect.description)
        apiPlaceDetailById(itemSelect.place_id).then((e) => {
            onPress(e.data.result);
        })
    }, [itemSelect])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={style.item} onPress={() => {
                setIsShow(false)
                setItemSelect(item)
            }} key={item.place_id}>
                <View style={{ width: "10%" }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                </View>
                <Text>{item.description}</Text>
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
                        // onFocus={() => {
                        //     setIsShow(true)
                        // }}
                        value={inputState}
                        onChangeText={handleInputOnchange}
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