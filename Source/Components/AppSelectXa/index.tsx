import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { apiGetGroups } from "../../ApiFunction/List";
import { apiCity, apiDistrict, apiSubDistrict } from "../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect"
interface Props {
    form?: any;
    field?: any;
    idHuyen?: string | number;
    defaultValue?: boolean;
}
export default (props: Props) => {
    const { field, form, idHuyen, defaultValue, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched, values } = form
    const [data, setData] = useState([])

    const callGetGroupList = () => {
        if ((!idHuyen || isEmpty(idHuyen + "") || isNull(idHuyen)) && !defaultValue) {
            setFieldValue(name, "");
            setData([]);
            return;
        }
        apiSubDistrict(idHuyen)
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setData(response.obj);
                    },
                    (e) => { }
                );
            })
            .catch((error) => { })
    }
    useEffect(() => {
        callGetGroupList();
    }, [idHuyen])

    const onSelect = (item) => {
        setFieldValue(name, item.id);
    }

    if (field) {
        return (
            <>
                <AppSelect
                    {...field}
                    {...remainProps}
                    value={value}
                    data={data}
                    onSelectCustum={onSelect}
                    idKey="id"
                    lableKey="name"
                />
                {touched[name] && errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </>
        )
    }
    return (
        <AppSelect
            {...remainProps}
            value={value}
            data={data}
        />
    )
}