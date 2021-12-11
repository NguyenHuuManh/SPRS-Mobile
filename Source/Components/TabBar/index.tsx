import { Platform, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faHome, faIdBadge, faPlusCircle, faMapMarkedAlt, faBell } from '@fortawesome/free-solid-svg-icons'
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import { AppColor, BackgoundMain } from "../../Helper/propertyCSS";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../Redux/Actions/FocusNotificationTab";

export default ({ state, descriptors, navigation }) => {
    const badgeShow = useSelector((state) => state.badgeReducer);
    const focusNotificationTab = useSelector((state) => state.forcusNotificationReducer);
    const dispatch = useDispatch();
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
                // height: Platform.OS == 'ios' ? 80 : 50,
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
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                height: 50,
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
                                if (route.name == "Thông báo") {
                                    dispatch(changeStatus(true));
                                } else {
                                    if (focusNotificationTab.status) {
                                        dispatch(changeStatus(false));
                                    }
                                }
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
                                    onPress={() => { navigation.navigate("MapCluser") }}
                                    onLongPress={onLongPress}
                                    key={index}
                                    style={{
                                        justifyContent: 'center',
                                        // backgroundColor: "red",
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        width: width / state.routes.length,
                                    }}
                                >

                                    {IconRender({ name: route.name, color: isFocused ? AppColor.MAIN_COLOR : "#A0A6BE" })}

                                    <Text style={{ color: isFocused ? AppColor.GRAY_LIGHT : AppColor.GRAY_DARK, fontWeight: "500", fontSize: 11 }}>
                                        {label}
                                    </Text>
                                    {/* </View> */}
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
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    width: width / state.routes.length,
                                    // backgroundColor: "pink"
                                }}
                            >
                                {
                                    (badgeShow.data.tab == route.name && badgeShow.data.number > 0) && (
                                        <View style={{ width: 15, height: 15, backgroundColor: "red", borderRadius: 10, position: "absolute", top: -5, right: 28, zIndex: 10, justifyContent: "center" }} >
                                            <Text style={{ color: "#FFF", alignSelf: "center", fontSize: 10, justifyContent: "center" }}>{badgeShow.data.number}</Text>
                                        </View>
                                    )
                                }
                                {IconRender({ name: route.name, color: isFocused ? AppColor.MAIN_COLOR : "#A0A6BE" })}
                                <Text style={{ color: isFocused ? AppColor.MAIN_COLOR : AppColor.GRAY_DARK, fontWeight: "500", fontSize: 11 }}>
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