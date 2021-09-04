import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./styles";
interface Props extends TouchableOpacityProps {
    title?: string;
    children?: any;

}
export default (props: Props) => {
    const { title, children } = props
    return (
        <TouchableOpacity
            {...props}
            style={styles.TouchableOpacity}
        >
            {title ? <Text style={styles.Text}>{title}</Text> : children}
        </TouchableOpacity>
    )
}