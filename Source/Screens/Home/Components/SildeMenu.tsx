import React, { Fragment, Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import { apiGetPermission } from '../../../ApiFunction/Auth';
import { AppColor } from '../../../Helper/propertyCSS';
import { width } from '../../../Helper/responsive';
import SOS from "../../../Assets/Images/locationSOS.svg";
import Relief from "../../../Assets/Images/locationRelief.svg";
import ORG from "../../../Assets/Images/locationOrganization.svg";
import Store from "../../../Assets/Images/locationStore.svg";
import ButtonCustom from '../../../Components/ButtonCustom';
import { MainStyle } from '../../../Style/main_style';
import { useNavigation } from '@react-navigation/core';


const codes = ["PER_STR_ACEN", "PER_RLP_ACEN", "", "PER_MOB_SOS", "PER_MOB_SUBCRIBE"]
export default () => {
    const [menu, setMenu] = useState<any>([]);
    const navigation = useNavigation<any>();
    useEffect(() => {
        apiGetPermission().then((e) => {
            setMenu(e.data.lstObj);
        })
    }, [])
    return (
        <Swiper style={styles.wrapper} showsButtons containerStyle={{ marginBottom: 70 }}>
            {menu.map((e) => (
                <View style={styles.slide1}>
                    {e.code == 'PER_RLP_ACEN' && (
                        <View>
                            <ButtonCustom styleContain={[styles.text, { backgroundColor: AppColor.MAIN_COLOR }]}
                                onPress={() => { navigation.navigate("ReliefPoint") }}
                            >
                                <Text style={{ color: "#FFFF" }}>{e.name}</Text>
                            </ButtonCustom>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                <Relief fill={'#F4A921'} width={100} height={100} />
                            </View>
                        </View>
                    )}
                    {e.code == 'PER_STR_ACEN' && (
                        <View>
                            <ButtonCustom styleContain={[styles.text, { backgroundColor: AppColor.MAIN_COLOR }]}
                                onPress={() => { navigation.navigate("StorePoints") }}
                            >
                                <Text style={{ color: "#FFFF" }}>{e.name}</Text>
                            </ButtonCustom>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                <Store fill={'#F4A921'} width={100} height={100} />
                            </View>
                        </View>
                    )}
                    {e.code == 'PER_MOB_SOS' && (
                        <View>
                            <ButtonCustom styleContain={[styles.text, { backgroundColor: AppColor.MAIN_COLOR }]}
                                onPress={() => { navigation.navigate("SOS") }}
                            >
                                <Text style={{ color: "#FFFF" }}>{e.name}</Text>
                            </ButtonCustom>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                <SOS fill={'#F4A921'} width={100} height={100} />
                            </View>
                        </View>
                    )}
                    {e.code == 'PER_MOB_SUBCRIBE' && (
                        <View>
                            <ButtonCustom styleContain={[styles.text, { backgroundColor: AppColor.MAIN_COLOR }]}
                                onPress={() => { navigation.navigate("SubcribeList") }}
                            >
                                <Text style={{ color: "#FFFF" }}>{e.name}</Text>
                            </ButtonCustom>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                <ORG fill={'#F4A921'} width={100} height={100} />
                            </View>
                        </View>
                    )}
                </View>
            ))}
        </Swiper>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        width: 200
    },
    image: {
        width: width,
        flex: 1
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    scrollView: {
        backgroundColor: AppColor.BG_LIGHT,

    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: "#FFFF",
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: "#000",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: AppColor.GRAY_DARK,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: AppColor.GRAY_DARK,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },

    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    }
});
