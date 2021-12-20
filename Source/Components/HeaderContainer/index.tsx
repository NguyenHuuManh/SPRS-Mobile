import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../ButtonCustom';
import styles from "./styles";

interface Props {
    isBack?: boolean;
    isBackReLoad?: string;
    isBackNavigate?: string;
    children?: any;
    centerEl?: any;
    rightEL?: any;
    flexLeft?: number;
    flexRight?: number;
    flexCenter?: number;
    leftView?: any;
    leftOnpress?: any;
    iconLeft?: any;
    isReplace?: any;
}

export default (props: Props) => {
    const { isBack, isBackReLoad, isBackNavigate, isReplace, children, centerEl, rightEL, flexLeft, flexCenter, flexRight, leftView, leftOnpress, iconLeft } = props
    const navigation = useNavigation<any>();
    const renderIsBack = () => {
        if (isBackReLoad) {
            return (
                <TouchableOpacity onPress={() => { navigation.push(isBackReLoad) }}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color="#FFF" />
                </TouchableOpacity>
            )
        }
        if (isBackNavigate) {
            return (
                <TouchableOpacity onPress={() => { navigation.navigate(isBackNavigate) }}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color="#FFF" />
                </TouchableOpacity>
            )
        }
        if (isReplace) {
            return (
                <TouchableOpacity onPress={() => { navigation.replace(isReplace) }}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color="#FFF" />
                </TouchableOpacity>
            )
        }
        if (isBack) {
            return (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color="#FFF" />
                </TouchableOpacity>
            )
        }
        if (leftView) {
            return (
                <TouchableOpacity onPress={leftOnpress}>
                    <FontAwesomeIcon icon={iconLeft} size={24} color="#FFF" />
                </TouchableOpacity>
            )
        }

    }
    return (
        <View style={[styles.container]}>
            <View style={{ flex: flexLeft ? flexLeft : 1, paddingLeft: isBack ? 5 : 0 }}>
                {renderIsBack()}
            </View>
            <View style={{ flex: flexCenter ? flexCenter : 5 }}>
                {centerEl}
            </View>
            <View style={{ flex: flexRight ? flexRight : 2 }}>
                {rightEL}
            </View>
        </View>
    )
}