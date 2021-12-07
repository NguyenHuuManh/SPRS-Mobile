import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
interface Props extends TouchableOpacityProps {
    title?: string;
    children?: any;
    styleContain?: any;
    styleTitle?: any;
    noShadow?: boolean;

}
export default (props: Props) => {
    const { title, children, styleContain, styleTitle, noShadow } = props
    return (
        <TouchableOpacity
            {...props}
            style={[styles.TouchableOpacity, noShadow ? "" : MainStyle.boxShadow, styleContain]}
        >
            {title ? <Text style={[styles.Text, styleTitle]}>{title}</Text> : children}
        </TouchableOpacity>
    )
}