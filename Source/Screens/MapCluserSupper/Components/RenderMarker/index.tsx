import React, { memo, useContext } from "react";
import { Image, Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { MapStore } from "../..";
import ORG from "../../../../Assets/Images/locationOrganization.svg";
import Relief from "../../../../Assets/Images/locationRelief.svg";
import SOS from "../../../../Assets/Images/locationSOS.svg";
import Store from "../../../../Assets/Images/locationStore.svg";
import { AppColor } from "../../../../Helper/propertyCSS";
interface Props {
    setMarkerTo: any;
    setStrokerDirection: any;
    showModal: any;
    setShowModal: any;
    item: any;
}
const types = ['rp', 'st', 'sos', 'org', 'sp']
export default memo((props: Props) => {
    const { modalBottom: { visible, setVisible }, markerToStore: { markerTo } } = useContext(MapStore)
    const { setMarkerTo, setStrokerDirection, showModal, setShowModal, item } = props
    // console.log('item', item);
    return (
        <Marker
            // key={item?.id | 0}
            coordinate={item.location}
            onPress={(e) => {
                if (item?.id) setMarkerTo(item);
                setStrokerDirection(0);
                setVisible(true);
            }}
            tracksViewChanges={false}
        >
            {item.type == 'rp' && (
                <Relief fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'st' && (
                <Store fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'sos' && (
                <SOS fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'org' && (
                <ORG fill={'#F4A921'} width={30} height={30} />
            )}
            {
                !types.includes(item.type) && (
                    <View>
                        <Image source={require('../../../../Assets/Icons/googleMaps.png')} style={{ width: 30, height: 30 }} />
                        <Text style={{ color: AppColor.CORLOR_TEXT, width: 70 }} ellipsizeMode="tail" numberOfLines={1}>Điểm đến</Text>
                    </View>
                )
            }

            {item?.id == markerTo.id && (
                <Text style={{ color: AppColor.CORLOR_TEXT, width: 70 }} ellipsizeMode="tail" numberOfLines={1}>{item?.name}</Text>
            )}
        </Marker>
    )
})