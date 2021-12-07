import { faHome, faSearchLocation, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/core";
import { debounce, isEmpty } from "lodash";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { ClusterMap } from 'react-native-cluster-map';
import Geolocation from 'react-native-geolocation-service';
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from "react-redux";
import { apiLoadMap } from "../../ApiFunction/PlaceAPI";
import HeaderContainer from "../../Components/HeaderContainer";
import { API_KEY } from "../../Constrants/url";
import { haversineDistance } from "../../Helper/FunctionCommon";
import { height } from "../../Helper/responsive";
import { RootState } from "../../Redux/Reducers";
import BottomModalSheet from "./Components/BottomModalSheet";
import ClusterMarker from "./Components/CluserMarker";
import Filter from "./Components/Filter";
import ModalSearch from "./Components/ModalSearch";
import RenderMarker from "./Components/RenderMarker";

export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const [region, setRegion] = useState<any>({});
    const [markerTo, setMarkerTo] = useState<any>({});
    const [myLocation, setMylocation] = useState<any>({});
    const [mapReady, setMapReady] = useState(false);
    const [northEast, setNorthEast] = useState<any>({});
    const [southWest, setSouthWest] = useState<any>({});
    const [centerMark, setCenterMark] = useState<any>({});
    const navigation = useNavigation<any>();
    const mapRef = createRef<any>();
    const [listMarker, setListMarker] = useState<any>([]);
    const [text, setText] = useState("Tìm Kiếm");
    const directionsRef = createRef<any>();
    const [dataDirection, setDataDirection] = useState({});
    const [strokerDirection, setStrokerDirection] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const { params } = useRoute<any>();

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
        // handleLocationPermission().then((e) => {
        //     // console.log("permission", e);
        // });
        Geolocation.watchPosition(
            (response) => {
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

    const onMapReady = () => {
        mapRef.current.mapRef.getMapBoundaries().then((e) => {
            setNorthEast(e.northEast);
            setSouthWest(e.southWest);
            setMapReady(true);
        });
        if (params?.toLocation) {
            mapRef.current.mapRef.animateToRegion({
                ...params?.toLocation,
                latitudeDelta: 0.006866,
                longitudeDelta: 0.006866,
            }, 1000);
            setMarkerTo(params.toLocation);
            if (!showModal) {
                setStrokerDirection(0);
            }
            setShowModal(true);
        }

    }

    const [visible, setVisible] = useState(false);
    const callLoadMap = (obj) => {
        apiLoadMap(obj).then((e) => {
            if (e.status == 200) {
                console.log("resMap", e);
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

    const renderDirection = (
        !isEmpty(myLocation) && !isEmpty(markerTo) && (
            <>
                <MapViewDirections
                    origin={myLocation}
                    destination={markerTo}
                    apikey={API_KEY}
                    strokeWidth={strokerDirection}
                    mode="DRIVING"
                    onError={(e) => {
                        alert("SPRS hiện chưa hỗ trợ khu vực của bạn!");
                    }}
                    ref={directionsRef}
                    onReady={(results) => {
                        setDataDirection({ distance: results.distance, duration: results.duration })
                    }}
                    strokeColor="blue"

                />
            </>

        )
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ModalSearch visible={visible} setVisible={setVisible} setText={setText} map={mapRef.current?.mapRef} setRegion={setRegion} region={region} setMarkerTo={setMarkerTo} />
            <View style={{ height: height * 0.07 }}>
                <HeaderContainer
                    isBackNavigate={params?.screen}
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
                                            },
                                            {
                                                text: 'Hủy',
                                                onPress: () => { }, style: 'cancel'
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                } else {
                                    // navigation.reset({
                                    //     index: 0,
                                    //     routes: [{ name: 'TabScreen' }]
                                    // })
                                    navigation.navigate("DrawScreen")
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
                <BottomModalSheet
                    dataDirection={dataDirection}
                    setStrokerDirection={setStrokerDirection}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    mapRef={mapRef}
                    myLocation={myLocation}
                />
                <View style={{ position: "absolute", top: 70, left: 20, zIndex: 100 }}>
                    <TouchableOpacity
                        onPress={() => {
                            mapRef.current.mapRef.animateToRegion({
                                ...myLocation,
                                latitudeDelta: 0.006866,
                                longitudeDelta: 0.006866,
                            }, 1000);
                        }}>
                        <FontAwesomeIcon icon={faStreetView} size={30} style={{ marginTop: 10 }} color="blue" />
                    </TouchableOpacity>
                </View>
                {
                    !isEmpty(region) && <ClusterMap
                        // cacheEnabled={true}
                        region={region}
                        initialRegion={region}
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 10 }}
                        showsUserLocation={true}
                        followsUserLocation
                        zoomControlEnabled
                        zoomEnabled
                        ref={mapRef}
                        renderClusterMarker={(props) => <ClusterMarker {...props} />}
                        onRegionChangeComplete={(e) => {
                            if (mapReady) {
                                mapRef.current.mapRef.getMapBoundaries().then((e) => {
                                    setNorthEast(e.northEast);
                                    setSouthWest(e.southWest);
                                });
                            }
                            setCenterMark({
                                latitude: Number(e?.latitude),
                                longitude: Number(e?.longitude)
                            });
                        }}
                        onMapReady={() => { onMapReady() }}
                        priorityMarker={renderDirection}
                    >
                        {mapReady && listMarker.map((e) => {
                            const coordinates = {
                                latitude: Number(e?.point.x),
                                longitude: Number(e?.point.y)
                            }
                            return (
                                <RenderMarker coordinate={coordinates} item={e} setMarkerTo={setMarkerTo} setShowModal={setShowModal} showModal={showModal} setStrokerDirection={setStrokerDirection} />
                            )
                        })}
                    </ClusterMap>
                }
            </View>
        </SafeAreaView >
    );

}