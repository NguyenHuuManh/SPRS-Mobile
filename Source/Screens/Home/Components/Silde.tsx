import React from "react";
import { Animated, FlatList, Image, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { height, width } from "../../../Helper/responsive";
import { MainStyle } from "../../../Style/main_style";
import LinearGradient from 'react-native-linear-gradient';
import { AppColor } from "../../../Helper/propertyCSS";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.60;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.5;

const Loading = () => (
    <View style={styles.loadingContainer}>
        <Text style={styles.paragraph}>Loading...</Text>
    </View>
);

const Backdrop = ({ movies, scrollX }) => {
    return (
        <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute', }}>
            <FlatList
                data={[{ key: 1, backdrop: 1 }, { key: 2, backdrop: 2 }]}
                keyExtractor={(item) => item.key + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                renderItem={({ item, index }) => {
                    // if (!item?.backdrop) {
                    //     return null;
                    // }
                    const translateX = scrollX.interpolate({
                        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                        outputRange: [0, width],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Image
                            source={require('../../../Assets/Images/backdgroundpng.png')}
                            style={{
                                width,
                                height: BACKDROP_HEIGHT,
                                position: 'absolute',
                            }}
                            resizeMode="stretch"
                        />
                    );
                }}
            />
            <LinearGradient
                colors={['rgba(228, 230, 216,0)', 'rgba(228, 230, 216,0)', 'rgba(244, 245, 240,1)']}
                style={{
                    height: BACKDROP_HEIGHT,
                    width,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    );
};

export default () => {
    const [movies, setMovies] = React.useState<any>([{ key: 'empty-left' }, { poster: 1, title: "Store", key: 1 }, { poster: 2, title: "Store", key: 2 }, { poster: 3, title: "Store", key: 3 }, { poster: 4, title: "Store", key: 4 }, { key: 'empty-right' }]);
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <Backdrop movies={movies} scrollX={scrollX} />
            <StatusBar hidden />
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={movies}
                keyExtractor={(item) => item.key}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: 'center' }}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    if (!item.poster) {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [100, 50, 100],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width: ITEM_SIZE, }}>
                            <Animated.View
                                style={[
                                    MainStyle.boxShadow,
                                    {
                                        marginHorizontal: SPACING,
                                        padding: SPACING * 2,
                                        alignItems: 'center',
                                        transform: [{ translateY }],
                                        backgroundColor: AppColor.BG_COLOR,
                                        borderRadius: 34,
                                        shadowColor: "#FFF"
                                    },

                                ]}
                            >
                                <Image
                                    source={{ uri: 'https://www.mammaiuto.it/immagini/2014/06/market-store-icon.jpg' }}
                                    style={styles.posterImage}
                                    resizeMode="cover"
                                />
                                <Text style={{ fontSize: 24, height: 80 }} numberOfLines={1}>
                                    {item.title}
                                </Text>
                            </Animated.View>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 0.9,
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
});
