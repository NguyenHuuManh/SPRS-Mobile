import { faMapMarkerAlt, faSearchLocation, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { debounce, isEmpty } from 'lodash';
import React, { createRef, useCallback, useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from 'react-native-toast-message';
import { apiPlaceAutoComplete, apiPlaceDetailById } from '../../ApiFunction/PlaceAPI';
import { MainStyle } from "../../Style/main_style";
import style from "./style";
interface Props {
    onPress?: any;
    renderRightButton?: any;
    mapRef?: any;
    onMapRef?: any;
    region?: any;
}
export default (props: Props) => {
    const { onPress, renderRightButton, mapRef, region } = props
    const [inputState, setInputState] = useState("");
    const [data, setData] = useState([]);
    const [itemSelect, setItemSelect] = useState<any>({})
    const [isShow, setIsShow] = useState(false);
    const [marker, setMarker] = useState({});
    const inputRef = createRef<any>();
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

    // useEffect(() => {
    //     if (isEmpty(data)) setIsShow(false)
    //     if (!isShow) setIsShow(true);
    // }, [data])

    // useEffect(() => {
    //     if (isEmpty(itemSelect)) return

    // }, [itemSelect])
    const onSelectItem = (itemSelect) => {
        setInputState(itemSelect.description)
        apiPlaceDetailById(itemSelect.place_id).then((e) => {
            onPress(e.data.result);
            setMarker({
                ...region,
                latitude: e.data.result.geometry.location.lat,
                longitude: e.data.result.geometry.location.lng
            })
        }).finally(() => {
        })
    }
    useEffect(() => {
        if (isEmpty(marker)) return;
        mapRef.current.animateToRegion(marker, 1000);
    }, [marker])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={style.item} onPress={() => {
                setIsShow(false);
                onSelectItem(item)
            }} key={item.place_id}>
                <View style={{ width: "10%" }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                </View>
                <Text>{item.description}</Text>
            </TouchableOpacity>
        )
    }

    const ClearSeach = () => {
        setInputState("");
    }
    return (
        <View style={[style.container]}>
            {!isShow && (
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
                    <TouchableOpacity onPress={() => { setIsShow(true) }} style={{ width: "60%" }}>
                        <View style={{ width: "100%" }} pointerEvents="none">
                            <TextInput
                                style={style.input}
                                value={inputState}
                            />
                        </View>
                    </TouchableOpacity>

                    {!isEmpty(inputState) ? (
                        <TouchableOpacity style={{ width: "10%", justifyContent: "center", alignItems: "center" }} onPress={() => { ClearSeach() }}>
                            <FontAwesomeIcon icon={faTimesCircle} color="black" size={16} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: "10%" }}></View>
                    )}
                    <View style={{ width: "15%" }}>
                        {
                            renderRightButton()
                        }
                    </View>

                </View>
            )}
            <Modal
                visible={isShow}
                transparent={true}
                onShow={() => { console.log("inputRef", inputRef.current.focus()) }}
            >
                <View style={[style.container]}>
                    <View style={[MainStyle.boxShadow, MainStyle.flexRow, style.inputContainer, { zIndex: 1000 }]}>
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
                        <View style={{ width: "60%" }}>
                            <TextInput
                                style={style.input}
                                value={inputState}
                                onChangeText={handleInputOnchange}
                                onFocus={() => { setIsShow(true) }}
                                ref={inputRef}
                            />
                        </View>
                        {!isEmpty(inputState) ? (
                            <TouchableOpacity style={{ width: "10%", justifyContent: "center", alignItems: "center" }} onPress={() => { ClearSeach() }}>
                                <FontAwesomeIcon icon={faTimesCircle} color="black" size={16} />
                            </TouchableOpacity>
                        ) : (
                            <View style={{ width: "10%" }}></View>
                        )}
                        <View style={{ width: "15%" }}>
                            {
                                renderRightButton()
                            }
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={() => { setIsShow(false) }}
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(250, 250, 250,0.1)',
                            // paddingTop: 60,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                        delayPressIn={150}
                    >
                        <TouchableWithoutFeedback
                            onPress={(e) => { e.preventDefault() }}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                scrollEnabled
                                style={[style.listItemContainer, MainStyle.boxShadow]}
                                ListFooterComponent={<View style={{ height: 20 }} />}
                                keyExtractor={(item) => item.place_id}
                            />
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </View>

            </Modal>

        </View >
    )
}