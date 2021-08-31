import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import GetLocation from "react-native-get-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
export default () => {
    const [region, setRegion] = useState({
        latitude: 21.0263084,
        longitude: 105.7709134,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [marker, setMarker] = useState({
        latitude: 21.0263084,
        longitude: 105.7709134
    })


    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location, "location");
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    useEffect(() => {
        getCurrentLocation();
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation
                region={region}
                onPress={(e) => {
                    setMarker(e.nativeEvent.coordinate)
                }}
            >
                <Marker
                    coordinate={marker}
                    title={"marker.title"}
                    description={"marker.description"}
                />
            </MapView>
        </View>
    );
}