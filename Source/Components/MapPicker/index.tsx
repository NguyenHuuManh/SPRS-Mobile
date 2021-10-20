import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { apiPlaceDetailByLongLat } from "../../ApiFunction/GoogleApi";
import { checkKeyNull } from "../../Helper/FunctionCommon";
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
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
    setAdress?: any;
    adress?: any;
}

export default (props: Props) => {
    const {
        onChangeCustom, placeholder,
        customInputStyle, title, iconSize,
        iconLeft, iconColor, iconRight, horizontal,
        styleTitle, secureTextEntry,
        setAdress, adress,
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
    // const [adress, setAdress] = useState<{ city: string, province: string, district: string, subDistrict: string, GPS_Lati: string, GPS_long: string, }>({
    //     city: "",
    //     province: "",
    //     district: "",
    //     subDistrict: "",
    //     GPS_Lati: "",
    //     GPS_long: "",
    // });

    const updateRegion = (region) => {
        setRegion(region);
        if (affterSearch) {
            setMarker(region)
        }
    }


    const getDetailPlace = (long: string | number, lat: string | number) => {
        apiPlaceDetailByLongLat(long, lat).then((response) => {
            if (response.status == 200) {
                const place = response?.data?.results[0]?.address_components;
                setAdress({
                    city: place[place.length - 1]?.long_name,
                    province: place[place.length - 2]?.long_name,
                    district: place[place.length - 2]?.long_name,
                    subDistrict: place[place.length - 3]?.long_name,
                    GPS_Lati: lat + "",
                    GPS_long: long + "",
                })
            }
        });
    }
    useEffect(() => {
        getDetailPlace(marker.longitude, marker.latitude);
    }, [marker])


    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (response) => {
                setRegion({
                    ...region, latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                })

                setMarker({
                    ...marker, latitude: response.coords.latitude,
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
        getCurrentLocation();
    }, [])

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
                        {isEmpty(checkKeyNull(adress)) ? (
                            <Text onPress={() => { setVisible(true) }} style={styles.input}>Chọn địa điểm</Text>
                        ) : (
                            <Text numberOfLines={1} ellipsizeMode='tail' onPress={() => { setVisible(true) }} style={styles.input}>{`${adress?.subDistrict}-${adress?.district}-${adress?.province}`}</Text>
                        )}
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
                <View style={{ flex: 1, zIndex: 200 }}>
                    <AutoCompleteSearchLocation
                        onPress={(data, detail) => {
                            console.log("data", data);
                            console.log("detail", detail);
                        }}
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
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{ flex: 3 }}
                            showsUserLocation={true}
                            showsMyLocationButton={false}
                            region={region}
                            zoomEnabled
                            ref={(mapView) => { mapRef = mapView; }}
                            onRegionChangeComplete={(e) => {
                                setRegion(e);
                            }}
                            onMapReady={() => { setMapReady(true); }}
                            onPress={(e) => {
                                setMarker({ ...e.nativeEvent.coordinate })
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
                    </View>
                </View>

            </Modal>
        </>
    )
}