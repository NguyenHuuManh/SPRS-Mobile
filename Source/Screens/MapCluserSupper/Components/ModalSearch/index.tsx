import { faMapMarkedAlt, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { debounce, isEmpty } from "lodash";
import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { useSelector } from "react-redux";
import { MapStore } from "../..";
import { apiPlaceAutoCompleteMap, apiPlaceDetailById } from "../../../../ApiFunction/PlaceAPI";
import HeaderContainer from "../../../../Components/HeaderContainer";
import { checkLatLng } from "../../../../Helper/FunctionCommon";
import { AppColor } from "../../../../Helper/propertyCSS";
import { height } from "../../../../Helper/responsive";
import { RootState } from "../../../../Redux/Reducers";

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
    const inputRef = createRef<any>();
    const [keyWord, setKeyWord] = useState("");
    const addressCurrent = useSelector((state: RootState) => state.updateAddressReducer);
    const [data, setData] = useState([])
    const [location, setLocation] = useState<any>({})
    const getCurrentLocation = () => {
        // console.log('addressCurrent', addressCurrent);
        if (checkLatLng(addressCurrent?.data?.GPS_lati, addressCurrent?.data.GPS_long)) {
            setLocation({
                latitude: addressCurrent?.data?.GPS_lati,
                longitude: addressCurrent?.data.GPS_long
            });
            return;
        }
        Geolocation.getCurrentPosition(
            (response) => {
                // console.log('responseCurrentLocation', response);
                setLocation({
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                });
                // getPoint(keyWord, response.coords.latitude, response.coords.longitude);
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


    const getPoint = (text, latitude?: any, longitude?: any) => {
        const params = {
            search: text,
            lati: latitude,
            long: longitude,
            limit: limit,
        }
        apiPlaceAutoCompleteMap(params).then((e) => {
            console.log("search", e);
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setData(e.data.obj);
                }
            }
        })
    }

    useEffect(() => {
        if (!visible) {
            // setData([]);
            return;
        };
        getCurrentLocation();
        if (inputRef?.current) {
            inputRef.current.focus();
        }

    }, [visible])

    const debounceSearch = useCallback(debounce(({ key, location }) => getPoint(key, location.latitude, location.longitude), 500), [])

    function handleInputOnchange(e) {
        setKeyWord(e);
        debounceSearch({ key: e, location: location });
    }


    const animateMap = (item) => {
        // setItemSelected(item);
        const marker = {
            latitude: Number(item.location.latitu),
            longitude: Number(item.location.longtitude),
            latitudeDelta: 0.006866,
            longitudeDelta: 0.006866
        }
        // console.log("marker", marker);
        mapRef?.current?.getMapRef().animateToRegion(marker, 1000);
        setMarkerTo && setMarkerTo({
            id: item.place_id,
            location: {
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude),
            },
            name: item.name,
            description: item.description,
            type: item.type
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
                // name: item.description,
            });
            setVisible(false);
            modalBottom.setVisible(true);
        })
    }

    const renderdescription = (item) => {
        if (item.type == 'rp') return 'Điểm cứu trợ ' + item.name + " " + item.description
        if (item.type == 'st') return 'Cửa hàng ' + item.name + " " + item.description
        if (item.type == 'sos') return 'Điểm SOS ' + item.name + " " + item.description
        if (item.type == 'org') return 'Tổ chức ' + item.name + " " + item.description
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
                <FontAwesomeIcon icon={faMapMarkedAlt} color={AppColor.MAIN_COLOR} />
                <Text ellipsizeMode="tail" numberOfLines={1} style={{ paddingLeft: 10 }}>
                    {
                        types.includes(item.type) ? renderdescription(item) : item.description
                    }
                </Text>
            </TouchableOpacity>
        )
    }
    const renderEmtyFlatlist = () => {
        return (
            <Text style={{ textAlign: "center", marginTop: 100 }}>
                {isEmpty(keyWord) ? "" : "Không tìm thấy kết quả"}
            </Text>
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
                                    height: 37,
                                    // padding: 5,
                                    borderWidth: 1,
                                    borderColor: "#ffff",
                                    alignItems: "center",
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#f7f7f7",
                                }}>
                                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={20} /></View>
                                <View style={{ width: "85%" }}>
                                    <TextInput
                                        numberOfLines={1}
                                        onChangeText={handleInputOnchange}
                                        style={{
                                            color: "black",
                                            width: "100%",
                                            paddingBottom: 2,
                                            paddingTop: 2,
                                            paddingLeft: 10

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
                            <TouchableOpacity onPress={() => { setVisible(false) }}><Text style={{ color: '#FFFF' }}>Đóng</Text></TouchableOpacity>
                        </View>
                    )}
                    flexLeft={1}
                    flexCenter={10}
                    flexRight={2}
                >
                </HeaderContainer >
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.place_id + ""}
                renderItem={renderItem}
                ListEmptyComponent={renderEmtyFlatlist}
            />
        </Modal>
    )
}