import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { checkKeyNull } from "../../Helper/FunctionCommon";
import { AppColor } from "../../Helper/propertyCSS";
import { MainStyle } from "../../Style/main_style";
import ContainerField from "../ContainerField";
import styles from "./styles";

interface Props {
    listComponents?: any;
    formikProps?: any;
}
export default memo((props: Props) => {
    const { listComponents, formikProps } = props
    const { values, setFieldValue, resetForm, submitForm } = formikProps;
    const [visible, setvisible] = useState(false);
    const [arrayItems, setArrayItems] = useState<any>([]);
    const onSelect = (itemObj: any) => {
        const index = listComponents.findIndex((e) => {
            return e.key + '' == itemObj.key + ''
        })
        if (index >= 0) {
            const itemSelect = listComponents[index].data.filter((e) => e.id == itemObj.item.id)[0];
            if (itemSelect.id + '' == values[itemObj.key] + '') {
                setFieldValue(itemObj.key, null);
                return;
            }
            setFieldValue(itemObj.key, itemSelect.id);
        }
    }
    const getItemSelect = (itemObj) => {
        const index = listComponents.findIndex((e) => {
            return e.key == itemObj.key
        })
        if (index >= 0) {
            const itemSelect = listComponents[index].data.filter((e) => e.id == itemObj.id)[0];
            return itemSelect;
        }
        return {};
    }

    const clearFilter = () => {
        listComponents.forEach(element => {
            setFieldValue(element.key, null);
        });
    }

    const renderItem = (item, index, key) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={{
                    minHeight: 50,
                    justifyContent: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: "flex-start"
                }}
                onPress={() => { onSelect({ item: item, key: key }) }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <View style={[styles.btnContainRadius, { width: 24, height: 24, borderRadius: 12, justifyContent: "center", alignItems: 'center' }]}>
                        <View style={[styles.btnRadius, { backgroundColor: item.id == values[key] ? AppColor.BUTTON_MAIN : "#FFFF" }]} />
                    </View>
                    <Text style={{ borderStyle: "solid", borderBottomWidth: 1, borderColor: "#edf0ee", paddingLeft: 10, paddingRight: 10 }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }



    useEffect(() => {
        const objClone = checkKeyNull({ ...values });
        delete objClone.sort;
        let array = [];
        Object.entries(objClone).forEach(([key, value]) => {
            const item = getItemSelect({ id: value, key: key })
            if (!isEmpty(item)) {
                array.push(item);
            }
        })
        // console.log(array, 'items');
        setArrayItems([...array]);
    }, [values])
    return (
        <View style={[styles.container]} >
            <View style={{ flexDirection: "row", height: "100%" }}>
                <TouchableOpacity onPress={() => { setvisible(true) }} style={{ justifyContent: "center", display: "flex", width: "10%" }}>
                    <FontAwesomeIcon icon={faFilter} color={AppColor.CORLOR_TEXT} /></TouchableOpacity>
                <ScrollView style={{ width: "90%", height: "100%", backgroundColor: "#FFF", flexDirection: "row" }} horizontal showsHorizontalScrollIndicator={false}>
                    {arrayItems.map((e) => {
                        return (
                            <View style={{ marginRight: 5, justifyContent: "center", }} key={e?.id}>
                                <ContainerField styleCustomContainer={{ borderWidth: 2, marginTop: 0, borderColor: AppColor.BUTTON_MAIN, paddingLeft: 5, paddingRight: 5 }}>
                                    <View style={{ minWidth: 60, maxWidth: 100, minHeight: 40, justifyContent: "center", display: "flex", alignItems: "center" }}>
                                        <Text ellipsizeMode="tail" numberOfLines={1} style={{ color: AppColor.CORLOR_TEXT }}>{e?.name || ""}</Text>
                                    </View>
                                </ContainerField>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            {
                visible && (
                    <Modal visible={visible} style={{ justifyContent: "center", alignItems: "center" }} animationType="fade" transparent={true} >
                        <TouchableOpacity
                            onPress={() => {
                                setvisible(false);
                                submitForm();
                            }}
                            style={[styles.containerModal]}>
                            <TouchableWithoutFeedback
                                onPress={(e) => { e.preventDefault() }}
                                style={[styles.containerContent]}>
                                <View style={[styles.content, MainStyle.boxShadow]}>
                                    <View style={[styles.containerChild]}>
                                        {
                                            listComponents.map((e, index) => {
                                                return (
                                                    <View style={[styles.containerColumn, { borderRightWidth: index <= listComponents.length - 2 ? 1 : 0, }]} key={index}>
                                                        <View style={[styles.headerColumn]}><Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16 }}>{e.title}</Text></View>
                                                        <FlatList
                                                            data={e.data}
                                                            keyExtractor={(item) => item.id + ''}
                                                            renderItem={({ item, index }) => renderItem(item, index, e.key)}
                                                        />

                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                    <View style={[styles.containerBottom]}>
                                        <TouchableOpacity style={[styles.buttonComfirm]} onPress={() => {
                                            setvisible(false);
                                            submitForm();
                                        }}>
                                            <Text style={{ color: "#FFF", fontWeight: 'bold' }}>OK</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.buttonComfirm]}
                                            onPress={() => {
                                                setvisible(false);
                                                resetForm();
                                            }}>
                                            <Text style={{ color: "#FFF", fontWeight: 'bold' }}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.buttonComfirm]}
                                            onPress={() => {
                                                setvisible(false);
                                                clearFilter();
                                                submitForm();
                                            }}>
                                            <Text style={{ color: "#FFF", fontWeight: 'bold' }}>Bỏ lọc</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
                )
            }
        </View>
    )
});