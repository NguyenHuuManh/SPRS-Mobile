import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import GetLocation from "react-native-get-location";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { handleLocationPermission } from "../../Helper/FunctionCommon";
import { height, width } from "../../Helper/responsive";
import Filter from "./Components/Filter";
import AutoCompleteSearchLocation from "../../Components/AutoCompleteSearchLocation";
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

    const mapRef = useRef(null);
    const [listMarker, setListMarker] = useState<any>([]);

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
            console.log("e", e)
            setNorthEast(e.northEast);
            setSouthWest(e.southWest);
            setMapReady(true);
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", backgroundColor: "#FFFF", borderRadius: 15, top: 10, left: 10, zIndex: 200 }}>
                <AutoCompleteSearchLocation />
            </View>
            <Filter />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1, marginTop: 0, marginRight: 20 }}
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
                            console.log("e", e)
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
    );

}