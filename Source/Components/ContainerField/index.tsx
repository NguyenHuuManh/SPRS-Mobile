import React from "react";
import { Text, View } from "react-native";
import styles from "./styles"
interface Props {
    title?: string;
    children?: any;

}
export default (props: Props) => {
    const { title, children } = props
    return (
        <View style={[styles.container]}>
            <View style={[styles.titleContainer]}><Text style={[styles.title]}>{title}</Text></View>
            {children}
        </View>
    )
}