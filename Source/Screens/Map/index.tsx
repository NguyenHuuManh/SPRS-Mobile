import { faDirections, faHome, faLocationArrow, faSearchLocation, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { debounce, isEmpty } from "lodash";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Callout, CalloutSubview, Marker, PROVIDER_GOOGLE, } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from "react-redux";
import { apiGetReliefPoint } from "../../ApiFunction/ReliefPoint";
import SOS from "../../Assets/Images/locationSOS.svg";
import HeaderContainer from "../../Components/HeaderContainer";
import { API_KEY } from "../../Constrants/url";
import { handleLocationPermission, haversineDistance } from "../../Helper/FunctionCommon";
import { height } from "../../Helper/responsive";
import { RootState } from "../../Redux/Reducers";
import Filter from "./Components/Filter";
import ModalSearch from "./Components/ModalSearch";
import BottomModalSheet from "./Components/BottomModalSheet"
import { apiLoadMap } from "../../ApiFunction/PlaceAPI";


export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const [region, setRegion] = useState<any>({});
    const [markerTo, setMarkerTo] = useState<any>({});
    const [centerMark, setCenterMark] = useState<any>({});
    const [myLocation, setMylocation] = useState<any>({});
    const [mapReady, setMapReady] = useState(false);
    const [northEast, setNorthEast] = useState<any>({})
    const [southWest, setSouthWest] = useState<any>({})
    const navigation = useNavigation();
    const mapRef = createRef<any>();
    const [listMarker, setListMarker] = useState<any>([]);
    const [text, setText] = useState("Tìm Kiếm");
    const callLoadMap = (obj) => {
        apiLoadMap(obj).then((e) => {
            if (e.status == 200) {
                if (e.data.code == 200) {
                    setListMarker(e.data.obj);
                }
            }
        })
    }
    const debounceLoadMap = useCallback(debounce((nextValue) => callLoadMap(nextValue), 1000), [])
    useEffect(() => {
        if (isEmpty(centerMark)) return;
        const distance = haversineDistance([southWest.latitude, southWest.longitude], [northEast.latitude, northEast.longitude], false)
        debounceLoadMap({ lat: centerMark.latitude, long: centerMark.longitude, radius: distance });
    }, [centerMark])

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (response) => {
                setRegion({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                    latitudeDelta: 0.006866,
                    longitudeDelta: 0.006866,
                })
                setMylocation({
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })
            },
            (error) => {
                console.log("error", error);
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
    useEffect(() => {
        getCurrentLocation();
        handleLocationPermission().then((e) => {
            console.log("permission", e);
        });
        Geolocation.watchPosition(
            (response: any) => {
                // Alert.alert("Location", response);
                // console.log("responseCurren", response)
                setMylocation({
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })
            },
            (error) => {
                console.log("watchPosition", error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 50,
                accuracy: {
                    android: "high"
                }
            }
        )
    }, [])
    // console.log("myLocation", myLocation);

    const onMapReady = () => {
        mapRef.current.getMapBoundaries().then((e) => {
            setNorthEast(e.northEast);
            setSouthWest(e.southWest);
            setMapReady(true);
        });
    }
    const [visible, setVisible] = useState(false);
    const renderMarker = (e) => {
        const coordinate = {
            latitude: Number(e?.address.gps_lati),
            longitude: Number(e?.address.gps_long)
        }
        return (
            <Marker
                key={e.id}
                coordinate={coordinate}
                description={"marker.description"}
            >
                <SOS fill={'#F4A921'} width={30} height={30} />
                {/* <Relief fill={'#F4A921'} width={30} height={30} /> */}
                {/* <SOS fill={'#F4A921'} width={30} height={30} /> */}
                <Callout
                    onPress={() => {
                        navigation.navigate("DetailPoint", { point: e });
                    }}
                >
                    <View style={{ width: 100, height: 100 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text>{e.name}</Text>
                        </View>
                    </View>
                </Callout>
            </Marker>
        )
    }
    return (
        <KeyboardAvoidingView behavior="padding">
            <ModalSearch visible={visible} setVisible={setVisible} setText={setText} map={mapRef} setRegion={setRegion} region={region} setMarkerTo={setMarkerTo} />
            <View style={{ height: height * 0.1 }}>
                <HeaderContainer
                    centerEl={(
                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
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
                                <Text numberOfLines={1} style={{ height: 30, alignSelf: "center", textAlignVertical: "center" }}>{text}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    flexLeft={0}
                    flexCenter={8}
                    flexRight={3}
                    rightEL={(
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 10 }}>
                            <TouchableOpacity onPress={() => {
                                if (userReducer.isGuest) {
                                    Alert.alert(
                                        'Yêu cầu đăng nhập',
                                        'Bạn có muốn đăng nhập để vào màn hình chức năng?',
                                        [
                                            {
                                                text: 'Đăng nhập',
                                                onPress: () => {
                                                    navigation.reset({
                                                        index: 0,
                                                        routes: [{ name: 'AuStackScreen' }]
                                                    })
                                                }
                                                //  navigation.navigate('AuStackScreen')

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
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'TabScreen' }]
                                    })
                                    // navigation.navigate('TabScreen')
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
                <BottomModalSheet />
                <View style={{ position: "absolute", top: 70, left: 20, zIndex: 100 }}>
                    <FontAwesomeIcon icon={faDirections} size={30} color="blue" />
                    <TouchableOpacity
                        onPress={() => {
                            mapRef.current.animateToRegion({
                                ...myLocation, latitudeDelta: 0.006866,
                                longitudeDelta: 0.006866,
                            }, 1000);
                        }}>
                        <FontAwesomeIcon icon={faStreetView} size={30} style={{ marginTop: 10 }} color="blue" />
                    </TouchableOpacity>
                </View>
                {
                    !isEmpty(region) && <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={region}
                        style={{ flex: 10 }}
                        showsUserLocation={true}
                        followsUserLocation
                        zoomControlEnabled
                        zoomEnabled
                        ref={mapRef}
                        onRegionChangeComplete={(e) => {
                            setRegion(e);
                            if (mapReady) {
                                mapRef.current.getMapBoundaries().then((e) => {
                                    setNorthEast(e.northEast);
                                    setSouthWest(e.southWest);
                                });
                            }
                            setCenterMark({
                                latitude: Number(e?.latitude),
                                longitude: Number(e?.longitude)
                            });
                            // console.log(
                            //     Math.log2(360 * (width / 256 / region.longitudeDelta)) + 1, "level"
                            // );
                        }}
                        onMapReady={() => { onMapReady() }}
                    >
                        {mapReady && listMarker.map((e) => { return renderMarker(e) })}
                        {!isEmpty(myLocation) && !isEmpty(markerTo) && (
                            <>
                                <MapViewDirections
                                    origin={myLocation}
                                    destination={markerTo}
                                    apikey={API_KEY}
                                    strokeWidth={5}
                                    mode="DRIVING"
                                    onError={(e) => {
                                        alert("SPRS hiện chưa hỗ trợ khu vực của bạn!");
                                    }}
                                />
                            </>

                        )}

                    </MapView>
                }

            </View>
        </KeyboardAvoidingView >
    );

}