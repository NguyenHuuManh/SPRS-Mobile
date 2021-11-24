import React, { memo } from "react";
import { Callout, Marker } from "react-native-maps";
import SOS from "../../../../Assets/Images/locationSOS.svg";
import Relief from "../../../../Assets/Images/locationRelief.svg";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
interface Props {
    coordinate?: any;
    setMarkerTo: any;
    setStrokerDirection: any;
    showModal: any;
    setShowModal: any;
    item: any;
}
export default memo((props: Props) => {
    const { coordinate, setMarkerTo, setStrokerDirection, showModal, setShowModal, item } = props
    const navigation = useNavigation();

    return (
        <Marker
            key={item.id}
            coordinate={coordinate}
            onPress={(e) => {
                setMarkerTo(e.nativeEvent.coordinate);
                if (!showModal) {
                    setStrokerDirection(0);
                }
                setShowModal(true);
            }}
            description={"marker.description"}
            tracksViewChanges={false}
        >
            {item.type == 'rp' && (
                <Relief fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'st' && (
                <SOS fill={'#F4A921'} width={30} height={30} />
            )}
            <Callout
                onPress={() => {
                    navigation.navigate("DetailPoint", { point: item });
                }}
            >
                <View style={{ width: 50, height: 50 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <Text>{item?.name}</Text>
                    </View>
                </View>
            </Callout>
        </Marker>
    )
})