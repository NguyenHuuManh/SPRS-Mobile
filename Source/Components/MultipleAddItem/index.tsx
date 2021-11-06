import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Field, Formik } from "formik";
import { findIndex, isEmpty } from "lodash";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { MainStyle } from "../../Style/main_style";
import AppSelectItems from "../AppSelectItems";
import Input from "../Input";

interface Props {
    items: any;
    setItems: any;
}

export default (props: Props) => {
    const { items, setItems } = props
    // const [items, setItems] = useState<any>([]);
    const [itemTypeSelect, setItemTypeSelect] = useState<any>({});
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 10, width: 150 }} key={item.id}>
                <View style={[MainStyle.boxShadow, { backgroundColor: "#FFF", height: 50, borderRadius: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                    <Text>{item.quantity + " " + item.unit}</Text>
                    <Text> | {item.name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            const arr = items.filter(e => e.id !== item.id);
                            console.log("Arr", arr)
                            setItems(arr);
                        }}
                        style={{ position: "absolute", top: 5, right: 5, }}>
                        <FontAwesomeIcon icon={faTimes} color="red" />
                    </TouchableOpacity >
                </View>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                renderItem={renderItem}
                // numColumns={3}
                data={items}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
            />
            <View>
                <Formik
                    initialValues={{
                        quantity: "",
                    }}
                    onSubmit={(values) => {

                        const itemObj = {
                            id: itemTypeSelect.id,
                            quantity: values.quantity,
                            name: itemTypeSelect.name,
                            unit: itemTypeSelect.unit

                        }
                        const id = findIndex(items, (e: any) => {
                            return Number(e.id) == Number(itemObj.id)
                        })
                        if (id >= 0) {
                            items[id] = {
                                ...items[id],
                                quantity: Number(itemObj.quantity) + Number(items[id].quantity)
                            }
                            console.log("item[i]", items[id]);
                            setItems([...items]);
                            return;
                        }
                        items.push(itemObj);
                        setItems([...items]);
                    }}
                >
                    {({ submitForm }) => (
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ marginRight: 10, flex: 2 }}>
                                    <Field
                                        component={Input}
                                        name="quantity"
                                        keyboardType="phone-pad"
                                        dataDetectorTypes='phoneNumber'
                                        placeholder="Số lượng"
                                    />
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Field
                                        component={AppSelectItems}
                                        name="id"
                                        keyboardType="phone-pad"
                                        dataDetectorTypes='phoneNumber'
                                        onSelectOption={setItemTypeSelect}
                                        placeholder="Mặt hàng"
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={submitForm}
                                        style={{}}
                                    >
                                        <FontAwesomeIcon icon={faShoppingBasket} color="red" size={30} />
                                    </TouchableOpacity >
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View >
    )
}