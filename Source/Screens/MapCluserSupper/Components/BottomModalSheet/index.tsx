import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import * as React from 'react';
import { Text, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import ButtonCustom from '../../../../Components/ButtonCustom';
import { height } from '../../../../Helper/responsive';
interface Props {
    dataDirection?: any;
    strokerDirection?: number
    setStrokerDirection?: any;
    showModal?: any;
    setShowModal?: any;
    mapRef?: any;
    myLocation?: any;
    markerTo?: any;
}
export default React.memo((props: Props) => {
    const navigation = useNavigation();
    const { dataDirection, setStrokerDirection, strokerDirection, showModal, setShowModal, mapRef, myLocation, markerTo } = props
    const sheetRef = React.useRef(null);
    const contentRef = React.useCallback(node => {
        if (node !== null) {
            console.log("ref", node); // node = elRef.current
        }
    }, []);

    React.useEffect(() => {
        if (showModal) {
            snapToMax();
        }
    }, [showModal])

    const snapToMax = () => {
        sheetRef.current.snapTo(height * 0.5)
    }
    const snapToMin = () => {
        sheetRef.current.snapTo(1);
    }

    const renderContent = () => (
        <View
            ref={contentRef}
            style={{
                backgroundColor: '#F6BB57',
                padding: 16,
                paddingTop: 0,
                height: height * 0.5,
            }}
        >
            <View style={{ justifyContent: "flex-start", alignItems: "center", paddingBottom: 10, flex: 1 }}>
                <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
                <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
            </View>
            <View style={{ flex: 8 }}>
                <Text>Khoảng cách: {dataDirection?.distance}</Text>
                <Text>Thời gian:{dataDirection?.duration}</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 6, }}>
                <ButtonCustom onPress={() => {
                    setStrokerDirection(5)
                    mapRef.current.getMapRef().animateToRegion({
                        ...myLocation,
                        latitudeDelta: 0.006866,
                        longitudeDelta: 0.006866,
                    }, 1000);
                    // setShowModal(false);
                    snapToMin();
                }} styleContain={{ height: 50, marginRight: 10, alignItems: "center" }}>
                    <Text>Chỉ đường</Text>
                    {/* <FontAwesomeIcon icon={faDirections} size={30} color="blue" /> */}
                </ButtonCustom>
                <ButtonCustom onPress={() => {
                    navigation.navigate("DetailPoint", { point: marg });
                }} styleContain={{ height: 50, alignItems: "center" }}>
                    <Text>Xem chi tiết</Text>
                </ButtonCustom>
            </View>
        </View>
    );
    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[height * 0.12, height * 0.5]}
                borderRadius={10}
                renderContent={renderContent}
                onCloseEnd={() => { setShowModal(false) }}
            />
        </>
    );
})