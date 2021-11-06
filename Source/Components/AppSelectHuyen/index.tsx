import { isEmpty, isNull, isUndefined } from "lodash";
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
    // defaultValue?: boolean;
}
export default (props: Props) => {
    const { field, form, idTinh, onSelectOption, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched, values } = form
    const [data, setData] = useState(null)
    const [disableClear, setDisableClear] = useState(true);

    const callGetGroupList = () => {
        if ((!idTinh || isEmpty(idTinh + "") || isNull(idTinh)) && !isNull(data)) {
            console.log("vao đây");
            setDisableClear(false);
            setData([]);
            return;
        }
        apiDistrict(idTinh)
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setData([...response.obj]);
                    },
                    (e) => { }
                );
            })
            .catch((error) => { })
    }
    console.log("FiedHuyen", value)

    useEffect(() => {
        callGetGroupList();
    }, [idTinh])

    const onSelect = (item) => {
        setFieldValue(name, item?.id);
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
                    onItemSelect={onSelect}
                    keyValue={(item) => item.id}
                    labelValue={(item) => item?.name}
                    inputValue={(item) => item?.name}
                    disableClear={disableClear}
                />
                {errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </>
        )
    }
    return (
        <AppSelect
            {...remainProps}
            value={value}
            data={data}
            onItemSelect={onSelect}
            keyValue={(item) => item.id}
            labelValue={(item) => item?.name}
            inputValue={(item) => item?.name}
            disableClear={disableClear}
        />
    )
}