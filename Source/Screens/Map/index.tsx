import { faBell, faSearchLocation, faUserCircle, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { handleLocationPermission } from "../../Helper/FunctionCommon";
import { height } from "../../Helper/responsive";
import { profileActions, userActions } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducers";
import Filter from "./Components/Filter";

export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch()
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
    //     getCurrentLocation();
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
                    flexLeft={0}
                    flexRight={5}
                    rightEL={(
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <FontAwesomeIcon icon={faBell} color="#A0A6BE" size={24} />
                            <TouchableOpacity onPress={() => {
                                dispatch(profileActions.profileRequest())
                            }}>
                                <FontAwesomeIcon icon={faUserCircle} color="#A0A6BE" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {


                                if (userReducer.isGuest) {
                                    Alert.alert(
                                        'Yêu cầu đăng nhập',
                                        'Bạn có muốn đăng nhập để vào màn hình chức năng?',
                                        [
                                            {
                                                text: 'Đăng nhập',
                                                onPress: () => navigation.navigate('AuStackScreen')

                                            },
                                            {
                                                text: 'Hủy',
                                                onPress: () => console.log('No Pressed'), style: 'cancel'
                                            },
                                        ],
                                        { cancelable: false },
                                        //clicking out side of alert will not cancel
                                    );
                                } else {
                                    navigation.navigate('TabScreen')
                                }
                            }}>
                                <FontAwesomeIcon icon={faHome} color="#A0A6BE" size={24} />
                            </TouchableOpacity>
                        </View>
                    )}
                >
                </HeaderContainer >
            </View>
            <View style={{ height: height }}>
                <Filter />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 10 }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
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