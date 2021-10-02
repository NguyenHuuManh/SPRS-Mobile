import { faBell, faSearchLocation, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeaderContainer from "../../Components/HeaderContainer";
import ModalSwipe from "../../Components/ModalSwipe";
import { height, width } from "../../Helper/responsive";
import Filter from "./Components/Filter";
import BottonModalSheet from "../../Components/BottonModalSheet"
import ButtonCustom from "../../Components/ButtonCustom";
import { useNavigation } from "@react-navigation/core";
import AppAutoCompleteSeach from "../../Components/AppAutoCompleteSeach"
const dummyList = [
    { longitude: 105.75655572116376, latitude: 21.01406451278291 },
]
export default () => {
    const [region, setRegion] = useState({
        latitude: 21.0263084,
        longitude: 105.7709134,
        latitudeDelta: 0.006866,
        longitudeDelta: 0.006866,
    });
    const [marker, setMarker] = useState({
        latitude: 21.0263084,
        longitude: 105.7709134
    })
    const [mapReady, setMapReady] = useState(false);
    const [northEast, setNorthEast] = useState<any>({})
    const [southWest, setSouthWest] = useState<any>({})
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [listMarker, setListMarker] = useState<any>([]);

    const ref = useRef(null)
    //


    // useEffect(() => {
    //     let i = 0;
    //     var myVar = setInterval(function () {
    //         if (i == dummyList.length) return;
    //         listMarker.push(dummyList[i]);
    //         setListMarker([...listMarker])
    //         i++;
    //     }, 1000);
    // }, [])

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (response) => {
                setRegion({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })
            },
            (error) => { console.log("error", error) },
            {
                distanceFilter: 10,
            }
        )

    }
    // useEffect(() => {
    //     // getCurrentLocation();
    //     Geolocation.watchPosition(
    //         (response) => {
    //             Alert.alert("Location", response.provider);
    //             console.log("responseListen", response.coords)
    //         },
    //         (error) => { console.log("error", error) },
    //         {
    //             distanceFilter: 10,
    //         }
    //     )
    //     handleLocationPermission();
    // }, [])

    const onMapReady = () => {
        mapRef.current.getMapBoundaries().then((e) => {
            setNorthEast(e.northEast);
            setSouthWest(e.southWest);
            setMapReady(true);
        });
    }
    const [visible, setVisible] = useState(false);
    return (
        <KeyboardAvoidingView behavior="padding">
            <Modal visible={visible}>
                <View style={{ height: height * 0.1 }}>
                    <HeaderContainer
                        centerEl={(
                            <View style={{ flexDirection: "row", width: "70%", justifyContent: "center", alignItems: "center" }}>
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
                                    <TextInput numberOfLines={1} style={{ height: 30, color: "black", backgroundColor: "red", width: "80%", paddingTop: 2, lineHeight: 20 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    >
                    </HeaderContainer >
                </View>
                <ButtonCustom title="Close" onPress={() => { setVisible(false) }}></ButtonCustom>
                {/* </View> */}
            </Modal>
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
                                <Text numberOfLines={1} style={{ height: 30 }}>Timf Kiem</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    rightEL={(
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <FontAwesomeIcon icon={faBell} color="#A0A6BE" size={24} />
                            <FontAwesomeIcon icon={faUserCircle} color="#A0A6BE" size={24} />
                        </View>
                    )}
                >
                </HeaderContainer >
            </View>
            <View>
                <ButtonCustom
                    onPress={() => navigation.navigate('TabScreen')}
                    title="Go to notifications"
                />
            </View>
            {/* <BottonModalSheet /> */}
            <View style={{ height: height }}>
                <Filter />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 10 }}
                    showsUserLocation={true}
                    // showsMyLocationButton={true}
                    region={region}
                    followsUserLocation
                    zoomControlEnabled
                    zoomEnabled
                    ref={mapRef}
                    onRegionChangeComplete={(e) => {
                        setRegion(e);
                        if (mapReady) {
                            mapRef.current.getMapBoundaries().then((e) => {
                                // console.log("e", e)
                                setNorthEast(e.northEast);
                                setSouthWest(e.southWest);
                            });
                        }

                    }}
                    onMapReady={() => { onMapReady() }}



                // onPress={(e) => {
                //     listMarker.push({ longitude: e.nativeEvent.coordinate.longitude, latitude: e.nativeEvent.coordinate.latitude })
                //     setMarker(e.nativeEvent.coordinate)
                // }}

                >
                    {/* {listMarker.map((e, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={e}
                            title={"marker.title"}
                            description={"marker.description"}
                        />
                    )
                })} */}
                    {mapReady && (
                        <>
                            <Marker
                                coordinate={region}
                                title={"marker.title"}
                                description={"marker.description"}
                            />
                            <Marker
                                coordinate={southWest}
                                title={"southWest"}
                                description={"marker.description"}
                            />
                            <Marker
                                coordinate={northEast}
                                title={"northEast"}
                                description={"marker.description"}
                            />

                        </>

                    )}
                </MapView>
            </View>
        </KeyboardAvoidingView >
    );

}