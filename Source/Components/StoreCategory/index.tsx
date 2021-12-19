import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Field, Formik } from "formik";
import { findIndex, isEmpty } from "lodash";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../../Helper/propertyCSS";
import { MainStyle } from "../../Style/main_style";
import AppSelectStoreCategory from "../AppSelectStoreCategory";
import { addBasket } from "./validate";

interface Props {
    items?: any;
    setItems?: any;
    readonly?: any;
}

export default (props: Props) => {
    const { items, setItems, readonly } = props
    // const [items, setItems] = useState<any>([]);
    const [itemTypeSelect, setItemTypeSelect] = useState<any>({});
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 10, width: 150 }} key={item.id}>
                <View style={[MainStyle.boxShadow, { backgroundColor: "#FFF", height: 50, borderRadius: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                    <Text>{item.name}</Text>
                    {!readonly && (
                        <TouchableOpacity
                            onPress={() => {
                                const arr = items.filter(e => e.id !== item.id);
                                setItems(arr);
                            }}
                            style={{ position: "absolute", top: 5, right: 5, }}>
                            <FontAwesomeIcon icon={faTimes} color="red" />
                        </TouchableOpacity >
                    )}

                </View>
            </View>
        )
    }

    const renderEmptyCompoent = () => {
        return (
            <View style={{ height: 50, justifyContent: "center", paddingLeft: 20 }}>
                <Text style={{ color: AppColor.CORLOR_TEXT, textAlign: "center" }}>Chưa có sản phẩn</Text>
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
                ListEmptyComponent={renderEmptyCompoent}
            />
            {!readonly && (
                <View>
                    <Formik
                        validateOnChange={false}
                        validationSchema={addBasket}
                        initialValues={{
                            id: "",
                        }}
                        onSubmit={(values) => {
                            if (isEmpty(itemTypeSelect)) return;
                            const itemObj = {
                                id: itemTypeSelect.id,
                                name: itemTypeSelect.name,
                            }
                            const id = findIndex(items, (e: any) => {
                                return Number(e.id) == Number(itemObj.id)
                            })
                            if (id >= 0) return;
                            items.push(itemObj);
                            setItems([...items]);
                        }}
                    >
                        {({ submitForm }) => (
                            <>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flex: 9 }}>
                                        <Field
                                            component={AppSelectStoreCategory}
                                            name="id"
                                            onSelectOption={setItemTypeSelect}
                                            placeholder="Mặt hàng"
                                        />
                                    </View>
                                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={submitForm}
                                        >
                                            <FontAwesomeIcon icon={faShoppingBasket} color="blue" size={20} />
                                        </TouchableOpacity >
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            )}
        </View >
    )
}