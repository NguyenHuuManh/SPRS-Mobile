import { Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import React, { Fragment, useEffect, useState } from "react";
import {
    ModalSelectList,
} from 'react-native-modal-select-list';
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPersonBooth, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { isEmpty, isUndefined } from "lodash";
interface Props {

}

export default () => {
    let modalRef;
    const [label, setLabel] = useState("")
    const openModal = () => modalRef.show();
    const saveModalRef = ref => modalRef = ref;
    const [data, setData] = useState([]);
    const [isClear, setIsClear] = useState(false);

    const onSelectedOption = (value) => {
        // setFieldValue(name, value);
        let item = data.filter(item => item.value == value);
        setLabel(item[0].label);

    };

    const clearOption = () => {
        // setFieldValue(name, '');
        setLabel('');
    };

    useEffect(() => {
        if (isUndefined(label) || isEmpty(label + '')) {
            setIsClear(false);
            return;
        }
        setIsClear(true);
    }, [label]);

    const callApi = async ({ textSearch }) => {
        return new Promise(resolve => {
            const options = [{ label: "optionA", value: 1 }, { label: "optionB", value: 2 }, { label: "optionC", value: 3 }, { label: "optionA", value: 4 }, { label: "optionB", value: 5 }, { label: "optionC", value: 6 }]
            setData(options)
            resolve(options);
        });
    }
    return (
        <Fragment>
            <TouchableOpacity onPress={openModal} style={styles.containter}>
                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={24} /></View>
                <Text style={styles.textContent} numberOfLines={1}>{label}</Text>
            </TouchableOpacity>
            {isClear && (
                <TouchableOpacity onPress={clearOption} style={styles.btnClear} >
                    <Text numberOfLines={1}>X</Text>
                </TouchableOpacity>
            )}
            <ModalSelectList
                ref={saveModalRef}
                placeholder={"Text something..."}
                closeButtonText={"Close"}
                inputName="textSearch"
                provider={callApi}
                onSelectedOption={onSelectedOption}
                numberOfLines={3}
                disableTextSearch={false}
            />
        </Fragment>
    )
}