import { faPlus, faSortAlphaDownAlt, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Formik } from "formik";
import React, { memo, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonCustom from "../../../Components/ButtonCustom";
import FilterComponent from "../../../Components/FilterComponent";
import { useNavigation } from "@react-navigation/core";
import { apiCity } from "../../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../../Helper/FunctionCommon";
import { apiGetStoreCategory } from "../../../ApiFunction/List";
import { AppColor } from "../../../Helper/propertyCSS";
interface Props {
    body: any,
    setBody: any,
    pageSize: any,
    setPageSize: any,
    setIsRefesh: any,

}
export default memo(
    (props: Props) => {
        const { body, setBody, pageSize, setPageSize, setIsRefesh } = props
        const [dataType, setDataType] = useState([]);

        useEffect(() => {
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
                    setPageSize({ pageSize: 10, pageIndex: 0 });
                }}
            >
                {(formikProps) => (
                    <View style={{ height: "10%", width: "100%", justifyContent: "center" }}>
                        <View style={{ height: "70%", alignItems: "center" }}>
                            <View style={{ backgroundColor: "#FFF", flexDirection: "row", width: "90%", paddingRight: 10, paddingLeft: 10, borderRadius: 5, }}>
                                <FilterComponent
                                    formikProps={formikProps}
                                    listComponents={[
                                        { key: "type", title: "Lo???i s???n ph???m", data: dataType },
                                        { key: "status_store", title: "Tr???ng th??i", data: [{ id: 0, name: "Ho???t ?????ng" }, { id: 1, name: "????ng c???a t???m th???i" }, { id: 2, name: "????ng c???a" }] }
                                    ]}
                                />
                                <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {
                                    console.log(formikProps.values.sort, "sort")
                                    formikProps.setFieldValue("sort", !formikProps.values.sort);
                                    formikProps.submitForm();
                                }}>
                                    <FontAwesomeIcon color={AppColor.CORLOR_TEXT} icon={formikProps.values.sort ? faSortAlphaDownAlt : faSortAlphaUp} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        )
    }
)