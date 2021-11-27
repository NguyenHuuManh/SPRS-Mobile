import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, Props } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import * as React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { MapStore } from '../..';
import ButtonCustom from '../../../../Components/ButtonCustom';
import { AppColor } from '../../../../Helper/propertyCSS';
import { height } from '../../../../Helper/responsive';

interface Props {
    visible?: any;
}
export default React.memo((props: Props) => {
    const { visible } = props;
    const {
        modalBottom: { setVisible },
        strokerDirectionStore: { setStrokerDirection, strokerDirection },
        myLocationStore: { myLocation, setMylocation },
        mapRefStore: { mapRef },
        dataDirectionStore: { dataDirection },
        markerToStore: { markerTo }
    } = React.useContext(MapStore)
    const navigation = useNavigation();
    // console.log("markerTo", markerTo);
    const renderName = (item) => {
        if (item.type == 'rp') return 'Điểm cứu trợ ' + item.name
        if (item.type == 'st') return 'Cửa hàng ' + item.name
        if (item.type == 'sos') return 'Điểm SOS ' + item.name
        if (item.type == 'org') return 'Tổ chức' + item.name
        return item.name;
    }

    console.log("visibleBottomSheet", visible)
    return (
        <>
            {visible ? (
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType="slide"
                >
                    <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0)', height: "100%", justifyContent: "flex-end" }} onPress={() => { setVisible(false) }}>
                        <View style={{ height: "40%", backgroundColor: AppColor.MAIN_COLOR, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "95%", height: "98%" }}>
                                <View style={{ justifyContent: "flex-start", alignItems: "center", paddingBottom: 10, flex: 1 }}>
                                    <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
                                    <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
                                </View>
                                <View style={{ flex: 8 }}>
                                    <Text>Khoảng cách: {dataDirection?.distance}</Text>
                                    <Text>Thời gian:{dataDirection?.duration}</Text>
                                    <Text>{renderName(markerTo)}</Text>
                                    <Text>{markerTo?.description}</Text>
                                </View>
                                <View style={{ flexDirection: "row", flex: 6, }}>
                                    <ButtonCustom onPress={() => {
                                        setStrokerDirection(5)
                                        mapRef.current.getMapRef().animateToRegion({
                                            ...myLocation,
                                            latitudeDelta: 0.006866,
                                            longitudeDelta: 0.006866,
                                        }, 1000);
                                        setVisible(false);
                                    }} styleContain={{ height: 50, marginRight: 10, alignItems: "center" }}>
                                        <Text>Chỉ đường</Text>
                                    </ButtonCustom>
                                    {
                                        markerTo?.id && (
                                            <ButtonCustom onPress={() => {
                                                navigation.navigate("DetailPoint", { point: markerTo, from: "MapCluser" });
                                            }} styleContain={{ height: 50, alignItems: "center" }}>
                                                <Text>Xem chi tiết</Text>
                                            </ButtonCustom>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            ) : null}
        </>
    );
})