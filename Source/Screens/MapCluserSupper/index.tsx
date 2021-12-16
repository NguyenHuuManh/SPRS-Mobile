import { faChevronLeft, faHome, faSearchLocation, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/core";
import { debounce, isEmpty } from "lodash";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { useSelector } from "react-redux";
import { apiLoadMap } from "../../ApiFunction/PlaceAPI";
import HeaderContainer from "../../Components/HeaderContainer";
import { API_KEY } from "../../Constrants/url";
import { haversineDistance } from "../../Helper/FunctionCommon";
import { AppColor } from "../../Helper/propertyCSS";
import { height } from "../../Helper/responsive";
import { RootState } from "../../Redux/Reducers";
import BottomModalSheet from "./Components/BottomModalSheet";
import ClusterMarker from "./Components/CluserMarker";
import Filter from "./Components/Filter";
import ModalSearch from "./Components/ModalSearch";
import RenderMarker from "./Components/RenderMarker";
import MY_LOCATION from "../../Assets/Icons/myLocation.svg";
interface Store {
    regionStore: { region: any; setRegion: any };
    markerToStore: { markerTo: any, setMarkerTo: any };
    myLocationStore: { myLocation: any, setMylocation: any };
    mapRefStore: { mapRef: any };
    directionsRefStore: { directionsRef: any };
    modalBottom: { visible: boolean, setVisible: any };
    strokerDirectionStore: { strokerDirection: any, setStrokerDirection: any };
    dataDirectionStore: { dataDirection: any, setDataDirection: any };
    modalSearch: { visible: any, setVisible: any };
}


const initialState = {
    regionStore: { region: {}, setRegion: () => { } },
    markerToStore: { markerTo: {}, setMarkerTo: () => { } },
    myLocationStore: { myLocation: {}, setMylocation: () => { } },
    mapRefStore: { mapRef: null },
    directionsRefStore: { directionsRef: null },
    modalBottom: { visible: false, setVisible: () => { } },
    modalSearch: { visible: false, setVisible: () => { } },
    strokerDirectionStore: { strokerDirection: 0, setStrokerDirection: () => { } },
    dataDirectionStore: { dataDirection: {}, setDataDirection: () => { } }
}

export const MapStore = React.createContext<Store>(initialState);
export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const [region, setRegion] = useState<any>({});
    const [markerTo, setMarkerTo] = useState<any>({});
    const [myLocation, setMylocation] = useState<any>({});
    const [mapReady, setMapReady] = useState(false);
    const [northEast, setNorthEast] = useState<any>({})
    const [southWest, setSouthWest] = useState<any>({})
    const [centerMark, setCenterMark] = useState<any>({});
    const navigation = useNavigation<any>();
    const mapRef = createRef<any>();
    const [listMarker, setListMarker] = useState<any>([]);
    const [text, setText] = useState("Tìm Kiếm");
    const directionsRef = createRef<any>();
    const [dataDirection, setDataDirection] = useState({});
    const [strokerDirection, setStrokerDirection] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const { params } = useRoute<any>();
    const [typePoinst, setTypePoints] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);

    const store: Store = {
        regionStore: { region, setRegion },
        markerToStore: { markerTo, setMarkerTo },
        myLocationStore: { myLocation, setMylocation },
        mapRefStore: { mapRef },
        directionsRefStore: { directionsRef },
        modalBottom: { visible: modalVisible, setVisible: setModalVisible },
        strokerDirectionStore: { strokerDirection, setStrokerDirection },
        dataDirectionStore: { dataDirection, setDataDirection },
        modalSearch: { visible: searchVisible, setVisible: setSearchVisible }
    };

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
        mapRef.current.getMapRef().getMapBoundaries().then((e) => {
            setNorthEast(e.northEast);
            setSouthWest(e.southWest);
            setMapReady(true);
        });
        if (params?.toLocation) {
            const regionTo = {
                latitude: params?.toLocation.location.latitude,
                longitude: params?.toLocation.location.longitude,
                latitudeDelta: 0.006866,
                longitudeDelta: 0.006866,
            }
            mapRef.current.getMapRef().animateToRegion(regionTo, 1000);
            setMarkerTo(params.toLocation);
            setStrokerDirection(5);
        }
    }
    useEffect(() => {
        if (params?.toLocation && mapRef?.current?.getMapRef()) {
            const regionTo = {
                latitude: params?.toLocation.location.latitude,
                longitude: params?.toLocation.location.longitude,
                latitudeDelta: 0.006866,
                longitudeDelta: 0.006866,
            }
            mapRef.current.getMapRef().animateToRegion(regionTo, 1000);
            setMarkerTo(params.toLocation);
            setStrokerDirection(5);
        }
    }, [params])

    const callLoadMap = (obj) => {
        apiLoadMap(obj).then((e) => {
            console.log("e", e);
            if (e.status == 200) {
                if (e.data.code == 200) {
                    setListMarker(e.data.obj.map((e) => {
                        return (
                            {
                                id: e.id,
                                location: {
                                    latitude: Number(e?.point.x),
                                    longitude: Number(e?.point.y),
                                },
                                type: e.type,
                                name: e.name,
                                user_id: e.user_id
                            }
                        )
                    }));
                }
            }
        })
    }
    const debounceLoadMap = useCallback(debounce((nextValue) => callLoadMap(nextValue), 50), []);


    const toStringArr = (arr) => {
        let fillter = '';
        for (let i = 0; i < arr.length; i++) {
            if (i < arr.length - 1) {
                fillter += arr[i] + ',';
            } else {
                fillter += arr[i];
            }
        }
        return fillter;
    }

    useEffect(() => {
        if (isEmpty(centerMark)) return;
        const distance = haversineDistance([southWest.latitude, southWest.longitude], [northEast.latitude, northEast.longitude], false);
        const fillter = isEmpty(typePoinst) ? "sos,rp,st,org" : toStringArr(typePoinst.map((e) => { return e.id }))
        debounceLoadMap({ lat: centerMark.latitude, long: centerMark.longitude, radius: distance, filter: fillter });
    }, [centerMark]);

    useEffect(() => {
        setCenterMark({ ...centerMark });
    }, [typePoinst])

    const renderDirection = (
        !isEmpty(myLocation) && !isEmpty(markerTo) && (
            <>
                <MapViewDirections
                    origin={myLocation}
                    destination={markerTo.location}
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
                    strokeColor={AppColor.MAIN_COLOR}

                />
            </>

        )
    )

    return (
        <MapStore.Provider value={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <ModalSearch setText={setText} visible={searchVisible} setVisible={setSearchVisible} />
                <View style={{ height: height * 0.07 }}>
                    <HeaderContainer
                        // isReplace={params?.screen}
                        leftView={params?.screen}
                        leftOnpress={() => {
                            if (params?.screen == 'DetailPoint') {
                                navigation.goBack();
                                return;
                            }
                            navigation.replace(params?.screen)
                        }}
                        iconLeft={faChevronLeft}
                        centerEl={(
                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => {
                                    setSearchVisible(true);
                                }} style={{
                                    padding: 5,
                                    borderWidth: 1,
                                    borderColor: "#FFF",
                                    alignItems: "center",
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#FFF",
                                    height: 37
                                }}>
                                    <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={20} /></View>
                                    <Text numberOfLines={1} style={{ height: 30, alignSelf: "center", textAlignVertical: "center", width: "90%", color: AppColor.CORLOR_TEXT, paddingLeft: 10 }} ellipsizeMode="tail">{text}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        flexLeft={params?.screen ? 2 : 0}
                        flexCenter={14}
                        flexRight={3}
                        rightEL={(
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
                                        navigation.navigate("DrawScreen")
                                    }
                                }}>
                                    <FontAwesomeIcon icon={faHome} color="#FFFF" size={24} />
                                </TouchableOpacity>
                            </View>
                        )}
                    >
                    </HeaderContainer >
                </View>
                <View style={{ height: height }}>
                    <Filter typePoinst={typePoinst} setTypePoints={setTypePoints} />
                    <BottomModalSheet visible={modalVisible} />
                    <View style={{ position: "absolute", top: 70, left: 20, zIndex: 100 }}>
                        <TouchableOpacity
                            onPress={() => {
                                mapRef.current.getMapRef().animateToRegion({
                                    ...myLocation,
                                    latitudeDelta: 0.006866,
                                    longitudeDelta: 0.006866,
                                }, 1000);
                            }}>
                            {/* <FontAwesomeIcon icon={faStreetView} size={30} style={{ marginTop: 10 }} color="blue" /> */}
                            <MY_LOCATION width={35} height={35} fill={AppColor.MAIN_COLOR} />
                        </TouchableOpacity>
                    </View>
                    {
                        !isEmpty(region) && <ClusteredMapView
                            style={{ flex: 1 }}
                            data={listMarker}
                            initialRegion={{ latitude: 21.0053961, longitude: 105.518345, latitudeDelta: 0.006866, longitudeDelta: 0.006866 }}
                            // region={region}
                            ref={mapRef}
                            showsUserLocation={true}
                            followsUserLocation
                            renderMarker={(item) => {
                                return <RenderMarker
                                    key={item.id}
                                    item={item}
                                    setMarkerTo={setMarkerTo}
                                    setShowModal={setShowModal}
                                    setStrokerDirection={setStrokerDirection}
                                    showModal={showModal}
                                />
                            }}
                            renderCluster={(cluser, onPress) => { return <ClusterMarker cluser={cluser} onPress={onPress} /> }}
                            clusteringEnabled={true}
                            onRegionChangeComplete={(e) => {
                                if (mapReady) {
                                    mapRef.current.getMapRef().getMapBoundaries().then((bound) => {
                                        setNorthEast(bound.northEast);
                                        setSouthWest(bound.southWest);
                                    });
                                }
                                setCenterMark({
                                    latitude: Number(e?.latitude),
                                    longitude: Number(e?.longitude)
                                });
                            }}
                            onMapReady={() => { onMapReady() }}
                        >
                            {renderDirection}
                            {(!markerTo.id && !isEmpty(markerTo.location)) && (
                                <RenderMarker
                                    key="customMark"
                                    item={markerTo}
                                    setMarkerTo={setMarkerTo}
                                    setShowModal={setShowModal}
                                    setStrokerDirection={setStrokerDirection}
                                    showModal={showModal}
                                />
                            )}
                        </ClusteredMapView>
                    }
                </View>
            </SafeAreaView >
        </MapStore.Provider>
    );

}