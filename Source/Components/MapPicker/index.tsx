import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty } from "lodash";
import React, { createRef, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { apiPlaceDetailByLongLat } from "../../ApiFunction/PlaceAPI";
import { checkKeyNull, checkLatLng } from "../../Helper/FunctionCommon";
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import AutoCompleteSearchLocation from "../AutoCompleteSearchLocation";
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
    setAdress?: any;
    adress?: any;
    defaultAdress?: any;
    underLine?: boolean;
    markerRender?: any;
    disabled?: boolean;
}

export default (props: Props) => {
    const {
        onChangeCustom, placeholder,
        customInputStyle, title, iconSize,
        iconLeft, iconColor, iconRight, horizontal,
        styleTitle, secureTextEntry,
        setAdress, adress,
        leftIconOnpress,
        defaultAdress,
        underLine,
        markerRender,
        disabled,
        ...remainProps
    } = props
    const [region, setRegion] = useState<any>({});
    const [mapReady, setMapReady] = useState(false);
    const [marker, setMarker] = useState<any>({});
    const [visible, setVisible] = useState(false);
    const mapRef = createRef<any>();

    const getDetailPlace = (long: string | number, lat: string | number) => {
        try {
            apiPlaceDetailByLongLat(long, lat).then((response) => {
                if (response.status == 200) {
                    const place = response?.data?.results[0]?.address_components;
                    setAdress({
                        city: place[place?.length - 1]?.long_name,
                        province: place[place?.length - 2]?.long_name,
                        district: place[place?.length - 2]?.long_name,
                        subDistrict: place[place?.length - 3]?.long_name,
                        GPS_Lati: lat + "",
                        GPS_long: long + "",
                    })
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!disabled) {
            getDetailPlace(marker.longitude, marker.latitude);
        }
    }, [marker])
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (response) => {
                setRegion({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                    latitudeDelta: 0.006866,
                    longitudeDelta: 0.006866,
                })
                setMarker({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })
            },
            (error) => { console.log("errorCurrentLocation", error) },
            {
                distanceFilter: 10,
            }
        )

    }
    useEffect(() => {
        const address = checkKeyNull({ ...defaultAdress });
        if (!disabled) {
            if (visible && (isEmpty(address) || !checkLatLng(defaultAdress?.GPS_Lati || "", defaultAdress?.GPS_long || ""))) {
                getCurrentLocation();
            }
        }
    }, [visible])
    useEffect(() => {
        if (defaultAdress && checkLatLng(defaultAdress.GPS_Lati, defaultAdress.GPS_long)) {
            setRegion({
                ...region,
                latitude: Number(defaultAdress.GPS_Lati),
                longitude: Number(defaultAdress.GPS_long),
                latitudeDelta: 0.006866,
                longitudeDelta: 0.006866,
            })
            setMarker(
                {
                    latitude: Number(defaultAdress.GPS_Lati),
                    longitude: Number(defaultAdress.GPS_long),
                }
            )
            return;
        }
    }, [])
    const onMapReady = () => {
        setMapReady(true);
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
                    <TouchableOpacity
                        onPress={() => {
                            if (disabled) return;
                            setVisible(true);
                        }}
                        style={[styles.inputContainer, underLine ? styles.underLine : {}]}>
                        {isEmpty(checkKeyNull({ city: adress.city, district: adress.district, subDistrict: adress.subDistrict })) ? (
                            <Text style={styles.input}>Chọn địa điểm</Text>
                        ) : (
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.input}>{`${adress?.subDistrict}-${adress?.district}-${adress?.city}`}</Text>
                        )}
                        {
                            iconRight && (
                                <View
                                    style={[styles.iconRight]}>
                                    <FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} />
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={visible} animationType="fade">
                <View style={{ flex: 1, zIndex: 200 }}>
                    <AutoCompleteSearchLocation
                        onPress={(data) => {
                            setMarker({ ...marker, longitude: data.geometry.location.lng, latitude: data.geometry.location.lat });
                        }}
                        mapRef={mapRef}
                        region={region}
                        renderRightButton={() => (
                            <TouchableOpacity onPress={() => { setVisible(false) }} style={{ justifyContent: "center", width: "100%", height: "100%", alignItems: "center" }}>
                                <Text>Xong</Text>
                            </TouchableOpacity>
                        )}
                    />

                </View>
                <View style={{ width: width, justifyContent: "center", alignItems: "center", flex: 5, zIndex: 1 }}>
                    <View style={{ alignItems: "center", padding: 10, height: "20%" }}>
                        <Text>Tỉnh/Thanh phố: {adress?.city}</Text>
                        <Text>Quận/Huyện: {adress?.district}</Text>
                        <Text>Xã/Phường: {adress?.subDistrict}</Text>
                        <Text>{marker?.latitude}-{marker?.longitude}</Text>
                    </View>
                    <View style={[styles.containMap, MainStyle.boxShadow]}>
                        {
                            !isEmpty(region) && visible && <MapView
                                provider={PROVIDER_GOOGLE}
                                initialRegion={region}
                                style={{ flex: 10 }}
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                                followsUserLocation
                                zoomControlEnabled
                                zoomEnabled
                                ref={mapRef}
                                onMapReady={onMapReady}
                                onPress={(e) => {
                                    setMarker({ ...e.nativeEvent.coordinate })
                                }}
                            >
                                {mapReady && !isEmpty(marker) && (
                                    <>
                                        {markerRender && markerRender(marker)}
                                        {!markerRender && (
                                            <Marker
                                                coordinate={marker}
                                                title={"marker.title"}
                                                description={"marker.description"}
                                            />
                                        )}
                                    </>

                                )}
                            </MapView>
                        }
                    </View>
                </View>

            </Modal>
        </>
    )
}