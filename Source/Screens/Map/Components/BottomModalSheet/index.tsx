import { faSearchLocation, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { debounce } from 'lodash';
import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { height } from '../../../../Helper/responsive';
import styles from './styles';

export default () => {
    const [label, setLabel] = React.useState("")
    const sheetRef = React.useRef(null);
    const contentRef = React.useCallback(node => {
        if (node !== null) {
            console.log("ref", node); // node = elRef.current
        }
    }, []);

    const snapToMax = () => {
        sheetRef.current.snapTo(height * 0.9)
    }

    const renderContentView = () => (
        <View>
            <TouchableOpacity onPress={snapToMax} style={styles.containter}>
                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={24} /></View>
                <Text numberOfLines={1}>{label}</Text>
            </TouchableOpacity>
            <View style={{ paddingTop: 50 }}>
                <Text numberOfLines={1}>LS</Text>
                <Text numberOfLines={1}>LS</Text>
                <Text numberOfLines={1}>LS</Text>
            </View>
        </View>
    )

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
        </View>
    );
    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[height * 0.15, height * 0.5]}
                borderRadius={10}
                renderContent={renderContent}
            />
        </>
    );
}