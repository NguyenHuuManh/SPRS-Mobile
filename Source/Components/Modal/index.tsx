import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { height, width } from "../../Helper/responsive";
import styles from "./styles";
export default () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <TouchableOpacity onPress={() => { setVisible(true) }} style={styles.containter}>
                <View style={{ paddingRight: 5, paddingLeft: 5 }}><FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={20} /></View>
                <Text numberOfLines={1}>Timf Kiem</Text>
            </TouchableOpacity>
            <Modal
                visible={visible}
                style={{ width: width, height: height }}
            >

            </Modal>
        </>

    )
}