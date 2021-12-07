import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
    ImageBackground, StyleSheet, Text, View
} from 'react-native';
import Swiper from 'react-native-swiper';
import { apiGetPermission } from '../../../ApiFunction/Auth';
import ButtonCustom from '../../../Components/ButtonCustom';
import { AppColor } from '../../../Helper/propertyCSS';
import { height, width } from '../../../Helper/responsive';
export default () => {
    const [menu, setMenu] = useState<any>([]);
    const navigation = useNavigation<any>();
    useEffect(() => {
        apiGetPermission().then((e) => {
            setMenu(e.data.lstObj);
        })
    }, []);
    console.log('menu', menu)
    return (
        <>
            <Swiper style={styles.wrapper} showsButtons loop>
                {menu && menu?.map((e) => (
                    <View style={styles.slide1} key={e.code}>
                        {e.code == 'PER_MOB_RELIEF' && (
                            <ImageBackground source={require('../../../Assets/Images/reliefBG.png')} style={styles.imageBG} resizeMethod="scale" resizeMode="cover" >
                                <ButtonCustom
                                    styleContain={[styles.styleButton]}
                                    noShadow
                                    onPress={() => { navigation.navigate("ReliefPoint") }}
                                >
                                    <Text style={styles.text}>{e.name}</Text>
                                </ButtonCustom>
                            </ImageBackground>
                        )}
                        {e.code == 'PER_MOB_STORE' && (
                            <ImageBackground source={require('../../../Assets/Images/storeBG.png')} style={styles.imageBG} resizeMethod="scale" resizeMode="cover" >
                                <ButtonCustom
                                    styleContain={[styles.styleButton]}
                                    noShadow
                                    onPress={() => { navigation.navigate("StorePoints") }}
                                >
                                    <Text style={styles.text}>{e.name}</Text>
                                </ButtonCustom>
                            </ImageBackground>
                        )}
                        {e.code == 'PER_MOB_SOS' && (
                            <ImageBackground source={require('../../../Assets/Images/sosBG.png')} style={styles.imageBG} resizeMethod="scale" resizeMode="cover" >
                                <ButtonCustom
                                    noShadow
                                    styleContain={[styles.styleButton]}
                                    onPress={() => { navigation.navigate("SOS") }}
                                >
                                    <Text style={styles.text}>{e.name}</Text>
                                </ButtonCustom>
                            </ImageBackground>
                        )}
                        {e.code == 'PER_MOB_SUBCRIBE' && (
                            <ImageBackground source={require('../../../Assets/Images/subcribleBG.png')} style={styles.imageBG} resizeMethod="scale" resizeMode="cover" >
                                <ButtonCustom
                                    noShadow
                                    styleContain={[styles.styleButton]}
                                    onPress={() => { navigation.navigate("SubcribeList") }}
                                >
                                    <Text style={styles.text}>{e.name}</Text>
                                </ButtonCustom>
                            </ImageBackground>
                        )}
                    </View>
                ))}
            </Swiper>
        </>
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
        color: "#FF6F00",
        height: 30,
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    image: {
        width: width,
        flex: 1
    },
    slide1: {
        flex: 1,
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
    },
    styleButton: {
        backgroundColor: 'rgba(212,225,231,0.7)',
        justifyContent: "center",
        // width: 100,
    },
    imageBG: {
        height: height,
        width: width,
        backgroundColor: "#FFFF",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 150,
    }
});
