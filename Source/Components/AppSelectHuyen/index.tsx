import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { apiDistrict } from "../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect";
interface Props {
    form?: any;
    field?: any;
    idTinh?: string | number;
    onSelectOption?: any;
}
export default (props: Props) => {
    const { field, form, idTinh, onSelectOption, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched, values } = form
    const [data, setData] = useState(null)
    const [disableClear, setDisableClear] = useState(true);
    const callGetGroupList = () => {
        if ((!idTinh || isEmpty(idTinh + "") || isNull(idTinh))) {
            if (!isNull(data)) {
                setDisableClear(false);
                setData([]);
                return;
            }
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
                    header="Chọn quận/huyện"
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
            header="Chọn quận/huyện"
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