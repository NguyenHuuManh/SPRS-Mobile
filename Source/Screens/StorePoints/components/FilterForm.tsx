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
interface Props {
    body: any,
    setBody: any,
    pageSize: any,
    setPageSize: any,
    setIsRefesh: any,

}
export default (props: Props) => {
    const { body, setBody, pageSize, setPageSize, setIsRefesh } = props
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
                type: body.type,
                status_store: body.status_store,
                sort: body.sort,
            }}
            onSubmit={(values) => {
                setBody(values);
                setIsRefesh(true);
                setPageSize({ pageSize: 5, pageIndex: 1 });
            }}
        >
            {(formikProps) => (
                <View style={{ height: "10%", width: "100%", justifyContent: "center" }}>
                    <View style={{ height: "70%", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#FFF", flexDirection: "row", width: "90%", paddingRight: 10, paddingLeft: 10, borderRadius: 5, }}>
                            <FilterComponent
                                formikProps={formikProps}
                                listComponents={[
                                    { key: "type", title: "Loại sản phẩm", data: dataType },
                                    { key: "status_store", title: "Trạng thái", data: [{ id: 0, name: "Hoạt động" }, { id: 1, name: "Đóng cửa tạm thời" }, { id: 2, name: "Đóng cửa" }] }
                                ]}
                            />
                            <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {
                                console.log(formikProps.values.sort, "sort")
                                formikProps.setFieldValue("sort", !formikProps.values.sort);
                                formikProps.submitForm();
                            }}>
                                <FontAwesomeIcon icon={formikProps.values.sort ? faSortAlphaDownAlt : faSortAlphaUp} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            )}
        </Formik>
    )
}