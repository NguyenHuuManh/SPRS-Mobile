import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import GetLocation from "react-native-get-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { handleLocationPermission } from "../../Helper/FunctionCommon";
import { height, width } from "../../Helper/responsive";
import Filter from "./Components/Filter";
import AutoCompleteSearchLocation from "../../Components/AutoCompleteSearchLocation";
const dummyList = [
    { longitude: 105.75655572116376, latitude: 21.01406451278291 },
    // { longitude: 105.74525691568851, latitude: 21.052661561744074 },
    // { longitude: 105.76998520642519, latitude: 21.054002005013952 },
    // { longitude: 105.76998520642519, latitude: 21.038010706266807 },
    // { longitude: 105.76507642865181, latitude: 21.032867967787283 },
    // { longitude: 105.76470628380777, latitude: 21.011599166860588 },
    // { longitude: 105.77512566000223, latitude: 21.016053785943512 },
    // { longitude: 105.74595093727112, latitude: 21.015577439437248 },
    // { longitude: 105.76276067644358, latitude: 21.00105127031697 },
    // { longitude: 105.77017027884722, latitude: 20.992793030315273 },
    // { longitude: 105.78309081494808, latitude: 20.99508652738875 },
    // { longitude: 105.76220512390138, latitude: 21.011254572290728 },
    // { longitude: 105.77355053275824, latitude: 21.0178671436767 },
    // { longitude: 105.75711127370596, latitude: 21.033688489625295 },
    // { longitude: 105.7698467373848, latitude: 21.017522876558743 },
    // { longitude: 105.75215589255095, latitude: 21.015705758948062 },
    // { longitude: 105.77141985297203, latitude: 21.033040083726576 },
    // { longitude: 105.7470154389739, latitude: 21.026600308669302 },
    // { longitude: 105.75655572116376, latitude: 21.03438070361927 },
    // { longitude: 105.7698467373848, latitude: 21.033860604616777 },
    // { longitude: 105.7774394005537, latitude: 21.019035768128944 },
    // { longitude: 105.76539997011423, latitude: 21.010778523442013 },
    // { longitude: 105.76609399169683, latitude: 21.0018719672358 },
    // { longitude: 105.78415531665087, latitude: 20.99858915248421 },
    // { longitude: 105.76878022402526, latitude: 20.99050294131184 },
    // { longitude: 105.73993138968943, latitude: 21.002220026503682 },
    // { longitude: 105.73979292064905, latitude: 21.01968423495049 },
    // { longitude: 105.76752863824368, latitude: 21.031032260692662 },
    // { longitude: 105.7746146991849, latitude: 21.046395048377303 },
    // { longitude: 105.76313115656376, latitude: 20.997420367866447 },
    // { longitude: 105.77299498021604, latitude: 20.995258686932186 },
    // { longitude: 105.75340747833252, latitude: 21.014236650432924 }
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

    const [listMarker, setListMarker] = useState<any>([]);

    useEffect(() => {
        let i = 0;
        var myVar = setInterval(function () {
            if (i == dummyList.length) return;
            listMarker.push(dummyList[i]);
            setListMarker([...listMarker])
            i++;
        }, 1000);
    }, [])

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

    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", backgroundColor: "#FFFF", borderRadius: 15, top: 10, left: 10, zIndex: 200 }}>
                <AutoCompleteSearchLocation />
            </View>
            <Filter />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1, marginTop: 0 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                region={region}
                followsUserLocation
                zoomControlEnabled
                zoomEnabled
                onRegionChangeComplete={(e) => {
                    setRegion(e);
                    console.log("e", e)
                }}
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
                <Marker
                    coordinate={region}
                    title={"marker.title"}
                    description={"marker.description"}
                />
            </MapView>
        </View>
    );

}