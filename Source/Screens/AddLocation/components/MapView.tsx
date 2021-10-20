import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { handleLocationPermission } from "../../../Helper/FunctionCommon";
export default (props) => {
    const [region, setRegion] = useState({
        latitude: 21.0263084,
        longitude: 105.7709134,
        latitudeDelta: 0.006866,
        longitudeDelta: 0.006866,
    });
    const [mapReady, setMapReady] = useState(false);
    const [affterSearch, setAffterSearch] = useState(false)
    const [defaultLocation, setDefaulocation] = useState({})
    const [marker, setMarker] = useState<any>({ ...region })

    const updateRegion = (region) => {
        setRegion(region);
        if (affterSearch) {
            setMarker(region)
        }
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (response) => {
                console.log("res", response)
                setRegion({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })
                setDefaulocation({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })
                setMarker({
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
    useEffect(() => {
        getCurrentLocation()
        handleLocationPermission();
    }, [])

    const mapRef = useRef(null);
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            showsUserLocation={true}
            region={region}
            zoomEnabled
            ref={mapRef}
            onRegionChangeComplete={(e) => {
                updateRegion(e)
            }}
            onMapReady={() => { setMapReady(true); }}



            onPress={(e) => {
                setMarker(e.nativeEvent.coordinate)
            }}

        >
            {mapReady && (
                <>
                    <Marker
                        coordinate={marker}
                        title={"marker.title"}
                        description={"marker.description"}
                    />
                </>

            )}
        </MapView>
    )
}