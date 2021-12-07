import { faClock, faDirections, faMapMarked, faMapMarkerAlt, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, Props } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import { isUndefined } from 'lodash';
import * as React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MapStore } from '../..';
import { apiPlaceDetailByLongLat } from '../../../../ApiFunction/PlaceAPI';
import ButtonCustom from '../../../../Components/ButtonCustom';
import { AppColor } from '../../../../Helper/propertyCSS';
import { RootState } from '../../../../Redux/Reducers';

interface Props {
    visible?: any;
}
export default React.memo((props: Props) => {
    const { visible } = props;
    const [description, setdescription] = React.useState("");
    const profileReducer = useSelector((state: RootState) => state.profileReducer);
    const {
        modalBottom: { setVisible },
        strokerDirectionStore: { setStrokerDirection, strokerDirection },
        myLocationStore: { myLocation, setMylocation },
        mapRefStore: { mapRef },
        dataDirectionStore: { dataDirection },
        markerToStore: { markerTo }
    } = React.useContext(MapStore)
    const navigation = useNavigation();
    // console.log("markerTo", markerTo);
    const renderName = (item) => {
        if (item.type == 'rp') return 'Điểm cứu trợ ' + item.name
        if (item.type == 'st') return 'Cửa hàng ' + item.name
        if (item.type == 'sos') return 'Điểm SOS ' + item.name
        if (item.type == 'org') return 'Tổ chức' + item.name
        return item?.name;
    }
    const getDetailPlace = (long: string | number, lat: string | number) => {
        try {
            apiPlaceDetailByLongLat(long, lat).then((response) => {
                if (response.status == 200) {
                    console.log(response, "respone")
                    const place = response?.data?.results[0]?.formatted_address;
                    setdescription(place);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const convertTime = (minutes) => {
        const hour = minutes * 0.0166666667;
        if (Math.ceil(hour) > 1) return Math.ceil(hour) + ' giờ';
        return Math.ceil(minutes) + ' phút';
    }

    React.useEffect(() => {
        if (visible && !isUndefined(markerTo?.location)) {
            getDetailPlace(markerTo.location.longitude, markerTo.location.latitude);
        }
    }, [visible]);
    return (
        <>
            {visible ? (
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType="slide"
                >
                    <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0)', height: "100%", justifyContent: "flex-end" }} onPress={() => { setVisible(false) }}>
                        <View style={{ height: "40%", backgroundColor: "#f7eac6", borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "95%", height: "98%" }}>
                                <View style={{ position: "absolute", right: 10 }}>
                                    <ButtonCustom onPress={() => {
                                        setStrokerDirection(5)
                                        mapRef.current.getMapRef().animateToRegion({
                                            ...myLocation,
                                            latitudeDelta: 0.006866,
                                            longitudeDelta: 0.006866,
                                        }, 1000);
                                        setVisible(false);
                                    }} styleContain={{ alignItems: "center", backgroundColor: AppColor.MAIN_COLOR }}>
                                        <FontAwesomeIcon icon={faDirections} color="blue" style={{ marginRight: 10 }} />
                                        <Text style={{ color: "blue" }}>Chỉ đường</Text>
                                    </ButtonCustom>
                                </View>
                                <View style={{ justifyContent: "flex-start", alignItems: "center", paddingBottom: 10, flex: 1 }}>
                                    <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
                                    <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
                                </View>
                                <View style={{ flex: 8, alignItems: "center", justifyContent: "space-around", paddingTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        {/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}
                                        <Text style={{ fontWeight: "bold" }}>{renderName(markerTo)}</Text>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: "row" }}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} color="blue" />
                                            <Text>{description}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <FontAwesomeIcon icon={faMapMarked} style={{ marginRight: 5 }} color="blue" />
                                        <Text>Khoảng cách: {Math.round(dataDirection?.distance)} km</Text>
                                        <FontAwesomeIcon icon={faClock} style={{ marginLeft: 10, marginRight: 5 }} color="blue" />
                                        <Text>Thời gian:{convertTime(dataDirection?.duration)}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 6, alignItems: "center" }}>
                                    {
                                        markerTo?.id && (
                                            <ButtonCustom onPress={() => {
                                                if (markerTo?.user_id == profileReducer.data.id) {
                                                    if (markerTo.type == 'rp') navigation.navigate("UpdateReliefPoint", { id: markerTo.id, from: 'MapCluser' });
                                                    if (markerTo.type == 'st') navigation.navigate("UpdateStorePoint", { id: markerTo.id, from: 'MapCluser' });
                                                    if (markerTo.type == 'sos') navigation.push("SOS", { id: markerTo.id, from: 'MapCluser' });
                                                } else {
                                                    navigation.navigate("DetailPoint", { point: markerTo, from: "MapCluser" });
                                                }
                                            }} styleContain={{ alignItems: "center", backgroundColor: AppColor.MAIN_COLOR }}>
                                                <Text style={{ color: "#FFF" }}>Xem chi tiết</Text>
                                            </ButtonCustom>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            ) : null}
        </>
    );
})