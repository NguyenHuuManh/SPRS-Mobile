import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Field, Formik } from "formik";
import { findIndex, isEmpty } from "lodash";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { MainStyle } from "../../Style/main_style";
import AppSelectItems from "../AppSelectItems";
import Input from "../Input";
import { addBasket } from "./validate"

interface Props {
    items: any;
    setItems: any;
}

export default (props: Props) => {
    const { items, setItems } = props
    const [itemTypeSelect, setItemTypeSelect] = useState<any>({});
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 10, width: 150 }} key={item.item.id}>
                <View style={[MainStyle.boxShadow, { backgroundColor: "#FFF", height: 50, borderRadius: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                    <Text>{item.quantity + " " + item.item.unit}</Text>
                    <Text> | {item.item.name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            const arr = items.filter(e => e.item.id !== item.item.id);
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
                data={items}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(itemObj) => itemObj.item.id}
            />
            <View>
                <Formik
                    initialValues={{
                        quantity: "",
                        id: "",
                    }}
                    validationSchema={addBasket}
                    validateOnChange={false}
                    onSubmit={(values) => {

                        const itemObj = {
                            id: null,
                            item: {
                                id: itemTypeSelect.id,
                                unit: itemTypeSelect.unit,
                                name: itemTypeSelect.name,
                            },
                            quantity: values.quantity,

                        }
                        const id = findIndex(items, (e: any) => {
                            return Number(e.item.id) == Number(itemObj.item.id)
                        })
                        if (id >= 0) {
                            items[id] = {
                                ...items[id],
                                quantity: Number(itemObj.quantity) + Number(items[id].quantity)
                            }
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
                                        onSelectOption={setItemTypeSelect}
                                        placeholder="Mặt hàng"
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={submitForm}
                                        style={{}}
                                    >
                                        <FontAwesomeIcon icon={faShoppingBasket} color="blue" size={20} />
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