import { Platform, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faHome, faIdBadge, faPlusCircle, faMapMarkedAlt, faBell } from '@fortawesome/free-solid-svg-icons'
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import { AppColor } from "../../Helper/propertyCSS";
import { useSelector } from "react-redux";

export default ({ state, descriptors, navigation }) => {
    const badgeShow = useSelector((state) => state.badgeReducer)
    console.log("badgeShow", badgeShow)
    function IconRender({ name, color }) {
        switch (name) {
            case 'Trang chủ':
                return (
                    <View>
                        <FontAwesomeIcon size={20} color={color} icon={faHome} />
                    </View>
                );
            case 'Cá nhân':
                return (
                    <View>
                        <FontAwesomeIcon size={20} color={color} icon={faIdBadge} />
                    </View>
                );
            case 'Thông báo':
                return (
                    <View>
                        <FontAwesomeIcon size={20} color={color} icon={faBell} />
                    </View>
                );
            case 'Bản đồ':
                return (
                    <View>
                        <FontAwesomeIcon size={20} color={color} icon={faMapMarkedAlt} />
                    </View>
                );
            default:
                return (
                    <View>
                        <FontAwesomeIcon size={20} color={color} icon={faPlusCircle} />
                    </View>
                );
        }
    }


    return (
        <SafeAreaView
            style={{
                height: Platform.OS == 'ios' ? 80 : 50,
                borderWidth: 1,
                borderColor: 'transparent',
                justifyContent: "center"
            }}>
            <View style={[{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
            },
            {
                flexDirection: 'row',
                justifyContent: 'space-around',
                // alignItems: 'center',
                paddingBottom: 20,
                backgroundColor: '#F6BB57',
                height: 80,
            }]} >
                {
                    state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };
                        if (route.name == "Bản đồ") {
                            return (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={() => { navigation.navigate("TabScreen2") }}
                                    onLongPress={onLongPress}
                                    key={index}
                                    style={{
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        width: width / state.routes.length,
                                    }}
                                >

                                    {IconRender({ name: route.name, color: isFocused ? "#D71920" : "#A0A6BE" })}

                                    <Text style={{ color: isFocused ? AppColor.GRAY_LIGHT : AppColor.GRAY_DARK, fontWeight: "500", fontSize: 11 }}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }
                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                key={index}
                                style={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    width: width / state.routes.length,
                                    // backgroundColor: "pink"
                                }}
                            >
                                {
                                    (badgeShow.data.tab == route.name && badgeShow.data.number > 0) && (
                                        <View style={{ width: 20, height: 20, backgroundColor: "#A0A6BE", borderRadius: 10, position: "absolute", top: 10, right: 25, justifyContent: "center" }} >
                                            <Text style={{ color: "#FFF", alignSelf: "center", fontSize: 10, justifyContent: "center" }}>1</Text>
                                        </View>
                                    )
                                }
                                {IconRender({ name: route.name, color: isFocused ? "#D71920" : "#A0A6BE" })}

                                <Text style={{ color: isFocused ? AppColor.GRAY_LIGHT : AppColor.GRAY_DARK, fontWeight: "500", fontSize: 11 }}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </SafeAreaView >
    );
}