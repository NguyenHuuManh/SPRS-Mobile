import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeaderContainer from "../../Components/HeaderContainer";
import { height } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
const AVATA_SIZE = 100;
const Margin_BT = 20;
const ITEM_SIZE = AVATA_SIZE + Margin_BT

export default ({ navigation }) => {
    // const navigation = useNavigation()
    return (
        <View style={[styles.container]}>
            <View style={{ height: height * 0.1 }}>
                <HeaderContainer
                    centerEl={(
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Text>Điểm dịch vụ và cứu trợ</Text>
                        </View>
                    )}
                    flexLeft={1}
                    flexRight={1}
                    flexCenter={10}

                />
            </View>

            <View style={{ height: "35%", width: "100%", paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={[MainStyle.boxShadow, styles.box]}>
                            <TouchableOpacity onPress={() => { navigation.navigate("ReliefPoint") }} style={[styles.boxTouch]}>
                                <Text style={{ fontSize: 30 }}>SOS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={[MainStyle.boxShadow, styles.box]}>
                            <TouchableOpacity onPress={() => { navigation.navigate("ReliefPoint") }} style={[styles.boxTouch]}>
                                <Text style={{ fontSize: 30 }}>Cứu Trợ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={[MainStyle.boxShadow, styles.box]}>
                            <TouchableOpacity onPress={() => { navigation.navigate("StorePoints") }} style={[styles.boxTouch]}>
                                <Text style={{ fontSize: 30 }}>Cửa hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={[MainStyle.boxShadow, styles.box]}></View>
                    </View>
                </View>
            </View>
            <View style={{ height: "40%", width: "100%", backgroundColor: "#FFFF" }}>

            </View>

        </View>
    )
}