import React from "react";
import { View } from "react-native";
import SildeMenu from "./Components/SildeMenu";
import styles from "./styles";
const AVATA_SIZE = 100;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default ({ navigation }) => {


    return (
        <View style={[styles.container]}>
            <SildeMenu></SildeMenu>
        </View>
    )
}