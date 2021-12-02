import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { apiGetPermission } from "../../ApiFunction/Auth";
import HeaderContainer from "../../Components/HeaderContainer";
import { height } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import Silde from "./Components/Silde";
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