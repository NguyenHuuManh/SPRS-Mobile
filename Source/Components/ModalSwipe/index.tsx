import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonCustom from "../ButtonCustom"
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchLocation, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { isEmpty, isUndefined } from 'lodash';


export default () => {
    const [ShowComment, setShowModelComment] = useState(false);
    const [animateModal, setanimateModal] = useState(false);
    const [isClear, setIsClear] = useState(false);
    const data = [
        { value: 1, label: "Location 1" }, { value: 2, label: "Location 2" }, { value: 3, label: "Location 3" },
        { value: 4, label: "Location 4" }, { value: 5, label: "Location 5" }, { value: 6, label: "Location 6" },
        { value: 7, label: "Location 7" }, { value: 8, label: "Location 8" }, { value: 9, label: "Location 9" },
    ]
    const [label, setLabel] = useState("Tìm kiếm địa điểm")
    const oppenModal = () => {
        setShowModelComment(true);
    }

    const clearOption = () => {
        // setFieldValue(name, '');
        setLabel('');
    };


    const onSelectedOption = (item) => {
        console.log(item, "item")
        setLabel(item.label);
        setanimateModal(true);
    };

    useEffect(() => {
        if (isUndefined(label) || isEmpty(label + '')) {
            setIsClear(false);
            return;
        }
        setIsClear(true);
    }, [label]);



    return (
        <>
            <TouchableOpacity onPress={oppenModal} style={styles.containter}>
                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={20} /></View>
                <Text style={styles.textContent} numberOfLines={1}>{label}</Text>
            </TouchableOpacity>
            {isClear && (
                <TouchableOpacity onPress={clearOption} style={styles.btnClear} >
                    <Text numberOfLines={1}>X</Text>
                </TouchableOpacity>
            )}
            <SwipeUpDownModal
                modalVisible={ShowComment}
                PressToanimate={animateModal}
                //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
                ContentModal={
                    <>
                        <View style={styles.containerContent}>
                            <FlatList
                                data={data}
                                renderItem={({ item, index }) => (
                                    <ButtonCustom onPress={() => { onSelectedOption(item) }}>
                                        <Text>{item.label}</Text>
                                    </ButtonCustom>
                                )}
                            />
                        </View>
                    </>
                }
                HeaderStyle={styles.headerContent}
                ContentModalStyle={styles.Modal}
                OpenModalDirection="up"
                HeaderContent={
                    <View style={{ backgroundColor: "#F6BB57", alignItems: "center", padding: 5, paddingTop: 0 }}>
                        <FontAwesomeIcon icon={faChevronDown} color="#A0A6BE" size={20} />
                        <View style={styles.containerInput}>
                            <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={24} /></View>
                            <TextInput placeholder="Tìm kiếm địa điểm" style={styles.inputContent} numberOfLines={1} />
                        </View>
                    </View>
                }
                onClose={() => {
                    setShowModelComment(false);
                    setanimateModal(false);
                }}
            />
        </>
    )
}
