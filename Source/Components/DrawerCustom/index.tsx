import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Text } from "react-native";
export default (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <Text>Hello</Text>
            <Text>Manhnhhe130564@fpt.edu.vn</Text>
            <DrawerItemList {...props}>
            </DrawerItemList>
        </DrawerContentScrollView>
    )
}