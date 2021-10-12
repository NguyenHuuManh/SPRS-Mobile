import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AutoCompleteSearchLocation from "../AutoCompleteSearchLocation";
import ButtonCustom from "../ButtonCustom";
import styles from "./styles";

interface Props {

    onChangeCustom?: any;
    placeholder?: any;
    // memo?: boolean;
    customInputStyle?: ViewStyle;
    title?: string;
    iconLeft?: any;
    iconRight?: any;
    iconColor?: string;
    iconSize?: number;
    horizontal?: boolean;
    styleTitle?: any;
    secureTextEntry?: boolean;
    leftIconOnpress?: () => {};
}

export default (props: Props) => {
    const {
        onChangeCustom, placeholder,
        customInputStyle, title, iconSize,
        iconLeft, iconColor, iconRight, horizontal,
        styleTitle, secureTextEntry,
        leftIconOnpress,
        ...remainProps
    } = props
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
    // const { visible, setVisible } = props
    const [visible, setVisible] = useState(false)

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
    // useEffect(() => {
    //     getCurrentLocation();
    // }, [])

    var mapRef: MapView
    const MapAnimateTo = (region) => {
        mapRef.animateToRegion(region)
    }
    return (
        <>
            <View style={styles.containerInput}>
                {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}
                <View style={{ flexDirection: "row" }}>
                    {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                    {
                        iconLeft && (
                            <View style={[styles.icon]}>
                                <FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconLeft} />
                            </View>)
                    }
                    <View style={[styles.inputContainer]}>
                        <Text onPress={() => { setVisible(true) }} style={styles.input}>--Chọn đia điểm--</Text>
                        {
                            iconRight && (
                                <TouchableOpacity
                                    onPress={leftIconOnpress}
                                    style={[styles.iconRight]}>
                                    <FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </View>
            <Modal visible={visible} animationType="fade">
                <View style={{ flexDirection: "row", top: 10, zIndex: 1000, position: "absolute" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <AutoCompleteSearchLocation
                            onPress={(data, detail) => {
                                console.log("data", data);
                                console.log("detail", detail);
                            }}
                            renderRightButton={() => (<ButtonCustom title="Xong" onPress={() => { setVisible(false) }} />)}
                        />
                    </View>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    region={region}
                    zoomEnabled
                    ref={(mapView) => { mapRef = mapView; }}
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
            </Modal>
        </>
    )
}