import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Modal, Text, TouchableWithoutFeedback, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import ContainerField from "../ContainerField";
import styles from "./styles";

interface Props {
    listComponents?: any;
    formikProps?: any;
}
export default (props: Props) => {
    const { listComponents, formikProps } = props
    const { values, setFieldValue, resetForm, submitForm } = formikProps;
    const [visible, setvisible] = useState(false);
    const onSelect = (itemObj: any) => {
        const index = listComponents.findIndex((e) => {
            return e.key == itemObj.key
        })
        if (index >= 0) {
            const itemSelect = listComponents[index].data.filter((e) => e.id == itemObj.item.id)[0];
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
                    <View style={[styles.btnRadius, { backgroundColor: item.id == values[key] ? "blue" : "#FFFF" }]} />
                    <Text style={{ borderStyle: "solid", borderBottomWidth: 1, borderColor: "#edf0ee", paddingLeft: 10, paddingRight: 10 }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container]} >
            <View style={{ flexDirection: "row", height: "100%" }}>
                <TouchableOpacity onPress={() => { setvisible(true) }} style={{ justifyContent: "center", display: "flex", width: "10%" }}><FontAwesomeIcon icon={faFilter} /></TouchableOpacity>
                <ScrollView style={{ width: "90%", height: "100%", backgroundColor: "#FFF", flexDirection: "row" }} horizontal showsHorizontalScrollIndicator={false}>
                    {listComponents.map((e) => {
                        const item = getItemSelect({ id: values[e.key], key: e.key });
                        if (isEmpty(item)) return <></>
                        return (
                            <View style={{ marginRight: 5, justifyContent: "center" }} key={e.id}>
                                <ContainerField styleCustomContainer={{ marginTop: 0 }}>
                                    <View style={{ minWidth: 60, maxWidth: 100, minHeight: 40, justifyContent: "center", display: "flex", alignItems: "center" }}>
                                        <Text ellipsizeMode="tail" numberOfLines={1}>{item?.name || ""}</Text>
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
                                                    <View style={[styles.containerColumn, { borderRightWidth: index <= listComponents.length - 2 ? 1 : 0, }]}>
                                                        <View style={[styles.headerColumn]}><Text>{e.title}</Text></View>
                                                        <FlatList
                                                            data={e.data}
                                                            keyExtractor={({ item, index }) => index}
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
                                            <Text>OK</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.buttonComfirm]}
                                            onPress={() => {
                                                setvisible(false);
                                                resetForm();
                                            }}>
                                            <Text>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.buttonComfirm]}
                                            onPress={() => {
                                                setvisible(false);
                                                clearFilter();
                                                submitForm();
                                            }}>
                                            <Text>bỏ lọc</Text>
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
}