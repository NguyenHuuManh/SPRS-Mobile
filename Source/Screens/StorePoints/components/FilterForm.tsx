import { faPlus, faSortAlphaDownAlt, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonCustom from "../../../Components/ButtonCustom";
import FilterComponent from "../../../Components/FilterComponent";
import { useNavigation } from "@react-navigation/core";
import { apiCity } from "../../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../../Helper/FunctionCommon";
import { apiGetStoreCategory } from "../../../ApiFunction/List";
export default () => {
    const navigation = useNavigation<any>();

    const [dataKV, setDataKV] = useState([]);
    const [dataType, setDataType] = useState([]);


    const callGetGroupList = () => {
        apiCity()
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setDataKV(response.obj);
                    },
                    (e) => { }
                );
            })
            .catch((error) => { })
    }
    useEffect(() => {
        callGetGroupList();
        callGetItems();
    }, []);


    const callGetItems = () => {
        apiGetStoreCategory()
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setDataType(response.obj);
                    },
                    (e) => { }
                );
            })
            .catch((error) => { })
    }


    return (
        <Formik
            initialValues={{
                type: "",
                stage: "",
                sort: true,
            }}
            onSubmit={(values) => {
                console.log("valuessss", values);
            }}
        >
            {(formikProps) => (
                <View style={{ height: "15%", width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", height: "50%", alignItems: "center", paddingLeft: 5, paddingRight: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Danh sách cửa hàng</Text>
                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {
                            formikProps.setFieldValue("sort", !formikProps.values.sort);
                            formikProps.submitForm();
                        }}>
                            <FontAwesomeIcon icon={formikProps.values.sort ? faSortAlphaDownAlt : faSortAlphaUp} />
                        </TouchableOpacity>
                        <ButtonCustom onPress={() => { navigation.push("AddReliefPoint") }} ><FontAwesomeIcon icon={faPlus} /></ButtonCustom>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", height: "50%", alignItems: "center" }}>
                        <FilterComponent
                            formikProps={formikProps}
                            listComponents={[
                                { key: "type", title: "Khu vực", data: dataType },
                                { key: "stage", title: "Loại sản phẩm", data: dataKV }
                            ]}
                        />
                    </View>
                </View>
            )}
        </Formik>
    )
}