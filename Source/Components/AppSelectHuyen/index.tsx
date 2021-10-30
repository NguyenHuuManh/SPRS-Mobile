import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { apiGetGroups } from "../../ApiFunction/List";
import { apiCity, apiDistrict } from "../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect"
interface Props {
    form?: any;
    field?: any;
    idTinh?: string | number;
    onSelectOption?: any;
    defaultValue?: boolean;
}
export default (props: Props) => {
    const { field, form, idTinh, onSelectOption, defaultValue, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched, values } = form
    const [data, setData] = useState([])

    const callGetGroupList = () => {
        // console.log()
        if ((!idTinh || isEmpty(idTinh + "") || isNull(idTinh)) && !defaultValue) {
            setFieldValue(name, "");
            setData([]);
            return;
        }
        apiDistrict(idTinh)
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
    }, [idTinh])

    const onSelect = (item) => {
        setFieldValue(name, item.id);
        onSelectOption && (onSelectOption(item));
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