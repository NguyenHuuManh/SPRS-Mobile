import { faChevronDown, faSearchLocation, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { debounce, values } from 'lodash';
import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { height } from '../../Helper/responsive';
import styles from './styles';

export default function App() {
    const [isClear, setIsClear] = React.useState(false)
    const [label, setLabel] = React.useState("")
    const sheetRef = React.useRef(null);
    const contentRef = React.useCallback(node => {
        if (node !== null) {
            console.log("ref", node); // node = elRef.current
        }
    }, []);
    const [isSearch, setIsSearch] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');

    const fetchDropdownOptions = (nextValue) => {
        console.log(nextValue, "value")
    }

    const debounceDropDown = React.useCallback(debounce((nextValue) => fetchDropdownOptions(nextValue), 1000), [])

    function handleInputOnchange(value) {
        setKeyword(value);
        debounceDropDown(value);
    }

    const snapToMax = () => {
        sheetRef.current.snapTo(height * 0.9)
        setIsSearch(true);
    }

    const clearOption = () => { }

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



    const renderContentSearch = () => (
        <>
            <View style={{ backgroundColor: "#F6BB57", alignItems: "center", padding: 5, paddingTop: 0 }}>
                <View style={styles.containerInput}>
                    <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={24} /></View>
                    <TextInput
                        placeholder="Tìm kiếm địa điểm"
                        style={styles.inputContent}
                        value={keyword}
                        numberOfLines={1}
                        onChangeText={handleInputOnchange} />
                </View>
            </View>
            {isClear && (
                <TouchableOpacity onPress={clearOption} style={styles.btnClear} >
                    <Text numberOfLines={1}>X</Text>
                </TouchableOpacity>
            )}
        </>
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
            </View>
            {
                isSearch ? renderContentSearch() : renderContentView()
            }


        </View>
    );
    // console.log(isSearch, "isSearch")
    const controllSearch = React.useCallback(debounce((isSearch) => { setIsSearch(isSearch) }, 100), [])
    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[height * 0.2, height * 0.98]}
                borderRadius={10}
                renderContent={renderContent}
                onCloseEnd={() => { setIsSearch(false) }}
            />
        </>
    );
}