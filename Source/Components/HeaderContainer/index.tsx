import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import ButtonCustom from '../ButtonCustom';
import styles from "./styles";

interface Props {
    isBack?: boolean;
    children?: any;
    centerEl?: any;
    rightEL?: any;
    flexLeft?: number;
    flexRight?: number;
    flexCenter?: number;
}

export default (props: Props) => {
    const { isBack, children, centerEl, rightEL, flexLeft, flexCenter, flexRight } = props
    const navigation = useNavigation();

    return (
        <View style={[styles.container]}>
            <View style={{ flex: flexLeft ? flexLeft : 1, paddingLeft: isBack ? 5 : 0 }}>
                {isBack && (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
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