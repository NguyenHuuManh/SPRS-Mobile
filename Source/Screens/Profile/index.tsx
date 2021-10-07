import { faLock, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { View, Switch, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import ButtonCustom from "../../Components/ButtonCustom";
import Input from "../../Components/Input";
import { height, width } from "../../Helper/responsive";
import { logout } from "../../Redux/Actions/UserActions";
import styles from "./styles";
export default () => {
    const dispatch = useDispatch()
    const signout = () => {
        dispatch(logout());
    }

    const [isActive, setIsActive] = useState(false);
    return (
        // <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "10%" }} showsVerticalScrollIndicator={false}>

        <View style={{ width: width, height: height, paddingBottom: 80 }}>
            <View style={{ flex: 1, alignItems: "center", zIndex: 100, paddingTop: 10, paddingBottom: 20 }}>
                <View style={[styles.avata, styles.boxShadowAvata, { backgroundColor: "red" }]}></View>
            </View>
            <View style={{ flex: 6, backgroundColor: "#FFFF", justifyContent: "space-around", paddingTop: "20%", paddingBottom: "10%" }}>
                <View style={{ flex: 1, borderTopWidth: 0.5 }}>

                </View>
                <View style={{ flex: 1, borderTopWidth: 0.5 }}>

                </View>
                <View style={{ flex: 1, borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>

                </View>
            </View>
        </View>
        // </KeyboardAwareScrollView >
    );

}