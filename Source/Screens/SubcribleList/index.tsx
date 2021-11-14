import { faMapMarkedAlt, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { apiGetSubcribleStore } from "../../ApiFunction/StorePoint";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import { height } from "../../Helper/responsive";


export default () => {
    const [data, setData] = useState([])
    const getPoint = () => {
        apiGetSubcribleStore().then((e) => {
            console.log("eSubcrible", e)
            if (e.status == 200) {
                if (e.data.code === "200") {
                    setData(e.data.obj);
                }
            }
        })
    }


    useEffect(() => { getPoint() }, [])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", height: 50, alignItems: "center", borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20 }}
                onPress={() => { }}
                key={item.id}
            >
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <Text style={{ paddingLeft: 10 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: height * 0.1 }}>
                <HeaderContainer
                    isBack
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>Cửa hàng yêu thích</Text>
                            <FontAwesomeIcon icon={faStore} style={{ marginLeft: 10 }} color="#f57842" size={26} />
                        </View>
                    )}
                    flexLeft={1}
                    flexCenter={8}
                    flexRight={1}
                >
                </HeaderContainer >
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id + ""}
                renderItem={renderItem}
            />
        </View>
    )
}