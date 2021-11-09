import React from "react";
import { Text, View } from "react-native";
import styles from "./styles"
interface Props {
    title?: string;
    children?: any;
    disabled?: boolean

}
export default (props: Props) => {
    const { title, children, disabled } = props
    return (
        <View style={[styles.container]} pointerEvents={disabled ? "none" : "auto"}>
            <View style={[styles.titleContainer]}><Text style={[styles.title]}>{title}</Text></View>
            {children}
        </View>
    )
}