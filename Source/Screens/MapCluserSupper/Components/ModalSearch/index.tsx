import { faMapMarkedAlt, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { debounce, isEmpty } from "lodash";
import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MapStore } from "../..";
import { apiPlaceAutoCompleteMap, apiPlaceDetailById, apiPlaceDetailByLongLat } from "../../../../ApiFunction/PlaceAPI";
import ButtonCustom from "../../../../Components/ButtonCustom";
import HeaderContainer from "../../../../Components/HeaderContainer";
import { height } from "../../../../Helper/responsive";
import Geolocation from 'react-native-geolocation-service';

interface Props {
    setText: any;
    setVisible: any;
    visible: any;
}
const limit = 30;
const types = ['rp', 'st', 'sos', 'org', 'sp']
export default (props: Props) => {
    const {
        mapRefStore: { mapRef },
        markerToStore: { setMarkerTo },
        modalBottom,

    } = useContext(MapStore)
    const { setText, setVisible, visible } = props
    const [itemSelected, setItemSelected] = useState<any>({});
    const inputRef = createRef<any>();
    const [keyWord, setKeyWord] = useState("");
    useEffect(() => {
        if (isEmpty(itemSelected)) setText("");
        setText(itemSelected.label);
    }, [itemSelected])
    const [data, setData] = useState([])
    const [location, setLocation] = useState<any>({})
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (response) => {

                setLocation({
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                });
                getPoint(keyWord, response.coords.latitude, response.coords.longitude);
            },
            (error) => {
                if (error.code == 5) {
                    alert("Yêu cầu quyền truy cập vị trí của bạn để sử dụng chức năng này")
                    return;
                }
            },

            {
                distanceFilter: 10,
                enableHighAccuracy: true,
                accuracy: { android: "high" },
            }
        )

    }


    const getPoint = (text, latitude?, longitude?) => {
        const params = {
            search: text,
            lati: latitude | location.latitude,
            long: longitude | location.longitude,
            limit: limit,
        }
        apiPlaceAutoCompleteMap(params).then((e) => {
            console.log("eeessera", e);
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setData(e.data.obj);
                }
            }
        })
    }

    useEffect(() => {
        if (!visible) return;
        getCurrentLocation();
        if (inputRef?.current) {
            inputRef.current.focus();
        }

    }, [visible])

    const debounceSearch = useCallback(debounce(({ key, location }) => getPoint(key, location.latitude, location.longitude), 100), [])

    function handleInputOnchange(e) {
        setKeyWord(e);
        debounceSearch({ key: e, location: location });
    }


    const animateMap = (item) => {
        setItemSelected(item);
        const marker = {
            latitude: Number(item.location.latitu),
            longitude: Number(item.location.longtitude),
            latitudeDelta: 0.006866,
            longitudeDelta: 0.006866
        }

        mapRef.current.getMapRef().animateToRegion(marker, 1000);
        setMarkerTo && setMarkerTo({
            id: item.place_id,
            location: {
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude),
            },
            name: item.name,
            description: item.description
        })
        setText(item.description);
        setVisible(false);
        modalBottom.setVisible(true);

    }

    const getItem = (item) => {
        apiPlaceDetailById(item.place_id).then((e) => {
            const marker = {
                latitude: e.data.result.geometry.location.lat,
                longitude: e.data.result.geometry.location.lng,
                latitudeDelta: 0.006866,
                longitudeDelta: 0.006866
            }
            mapRef.current.getMapRef().animateToRegion(marker, 1000);
            setMarkerTo && setMarkerTo({
                location: {
                    latitude: Number(marker.latitude),
                    longitude: Number(marker.longitude),
                },
                name: item.description
            });
            setVisible(false);
            modalBottom.setVisible(true);
        })
    }

    const renderdescription = (item) => {
        if (item.type == 'rp') return 'Điểm cứu trợ ' + item.name + " " + item.description
        if (item.type == 'st') return 'Cửa hàng ' + item.name + " " + item.description
        if (item.type == 'sos') return 'Điểm SOS ' + item.name + " " + item.description
        if (item.type == 'org') return 'Tổ chức' + item.name + " " + item.description
        return item.description;
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", height: 50, alignItems: "center", borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                    if (types.includes(item.type)) {
                        animateMap(item);
                        return;
                    }
                    getItem(item);
                }}
                key={item.id}
            >
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <Text ellipsizeMode="tail" numberOfLines={1} style={{ paddingLeft: 10 }}>
                    {
                        types.includes(item.type) ? renderdescription(item) : item.description
                    }
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <Modal visible={visible} animationType="fade">
            <View style={{ height: height * 0.07 }}>
                <HeaderContainer
                    centerEl={(
                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <View
                                style={{
                                    height: 40,
                                    // padding: 5,
                                    borderWidth: 1,
                                    borderColor: "#FFF",
                                    alignItems: "center",
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#FFF"
                                }}>
                                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={20} /></View>
                                <View style={{ width: "85%" }}>
                                    <TextInput
                                        numberOfLines={1}
                                        onChangeText={handleInputOnchange}
                                        style={{
                                            color: "black",
                                            width: "100%",

                                        }}
                                        ref={inputRef}
                                        value={keyWord}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    rightEL={(
                        <View style={{ width: "90%", alignItems: "center", justifyContent: "center" }}>
                            <ButtonCustom title="Đóng" styleContain={{ marginTop: 0 }} onPress={() => { setVisible(false) }}></ButtonCustom>
                        </View>
                    )}
                    flexLeft={0}
                    flexCenter={8}
                    flexRight={3}
                >
                </HeaderContainer >
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.place_id + ""}
                renderItem={renderItem}
            />
        </Modal>
    )
}