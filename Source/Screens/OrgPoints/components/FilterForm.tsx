import { faSortAlphaDownAlt, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { apiGetItemType } from "../../../ApiFunction/List";
import FilterComponent from "../../../Components/FilterComponent";
import { checkCallAPI } from "../../../Helper/FunctionCommon";
interface Props {
    body: any,
    setBody: any,
    pageSize: any,
    setPageSize: any,
    setIsRefesh: any,

}
export default (props: Props) => {
    const { body, setBody, pageSize, setPageSize, setIsRefesh } = props
    const [dataType, setDataType] = useState([]);


    useEffect(() => {
        callGetItems();
    }, []);


    const callGetItems = () => {
        apiGetItemType()
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
                status: body.status,
                sort: body.sort,
            }}
            enableReinitialize
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
                                    { key: "status", title: "tr???ng th??i ho???t ?????ng", data: [{ id: 1, name: "??ang ho???t ?????ng" }, { id: 0, name: "???? k???t th??c" }, { id: 2, name: "Ng???ng ho???t ?????ng" }, { id: 3, name: "S???p di???n ra" }] },
                                    { key: "type", title: "Lo???i s???n ph???m", data: dataType }
                                ]}
                            />
                            <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {
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