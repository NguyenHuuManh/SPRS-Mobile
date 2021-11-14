import { faDirections, faSearchLocation, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { debounce } from 'lodash';
import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import ButtonCustom from '../../../../Components/ButtonCustom';
import { height } from '../../../../Helper/responsive';
import styles from './styles';
interface Props {
    dataDirection?: any;
    strokerDirection?: number
    setStrokerDirection?: any;
    showModal?: any;
    setShowModal?: any;
}
export default (props: Props) => {
    const { dataDirection, setStrokerDirection, strokerDirection, showModal, setShowModal } = props
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
    }, showModal)

    const snapToMax = () => {
        sheetRef.current.snapTo(height * 0.9)
    }

    const renderContent = () => (
        <View
            ref={contentRef}
            style={{
                backgroundColor: '#F6BB57',
                padding: 16,
                paddingTop: 0,
                height: height,
            }}
        >
            <View style={{ justifyContent: "flex-start", alignItems: "center", paddingBottom: 10 }}>
                <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
                <FontAwesomeIcon icon={faWindowMinimize} color="#A0A6BE" size={20} style={{ marginTop: -10 }} />
            </View>
            <View>
                <Text>Khoảng cách: {dataDirection?.distance}</Text>
                <Text>Thời gian:{dataDirection?.duration}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <ButtonCustom onPress={() => { setStrokerDirection(5) }}>
                    <Text>Chỉ đường</Text>
                    <FontAwesomeIcon icon={faDirections} size={30} color="blue" />
                </ButtonCustom>
            </View>
        </View>
    );
    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[height * 0.15, height * 0.5]}
                borderRadius={10}
                renderContent={renderContent}
                onCloseEnd={() => { setShowModal(false) }}
            />
        </>
    );
}