// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import { faCamera, faFileImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
// Import required components
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    FlatList,
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {
    CameraOptions,
    ImageLibraryOptions,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { MainStyle } from '../../Style/main_style';

interface Props {
    imageList: any,
    setImageList: any,
}

const ImagePicker = (props: Props) => {
    const { imageList, setImageList } = props;
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                        buttonPositive: ""
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                        buttonPositive: ""
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err' + err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options: CameraOptions = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response: any) => {
                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                setImageList(catListImage(imageList, [response.assets[0]]));
            });
        }
    };

    const catListImage = (arr1, arr2) => {
        const arr = arr1.concat(arr2);
        if (arr.length > 4) {
            alert("giới hạn chọn 4 ảnh")
            return arr.slice(arr.length - 4, arr.length);
        }
        return arr;
    }

    const chooseFile = (type) => {
        let options: ImageLibraryOptions = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            selectionLimit: 5,
        };
        launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            setImageList(catListImage(imageList, response.assets));
        });
    };

    const renderImage = ({ item, index }) => {
        return (
            <View
                key={item.fileName + "it"}
                style={[{ width: 130, marginBottom: 5, marginRight: 5, marginTop: 5, backgroundColor: "#FFF", borderRadius: 10 }, MainStyle.boxShadow]}>
                <TouchableOpacity style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
                    onPress={() => {
                        const arr = imageList.filter(e => e.fileName !== item.fileName);
                        setImageList(arr);
                    }}
                >
                    <FontAwesomeIcon icon={faTimesCircle} size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "100%", height: "100%", marginRight: 10, marginBottom: 10, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.imageStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "column", justifyContent: "center", backgroundColor: "#DDDD", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => captureImage('photo')}>
                        <FontAwesomeIcon icon={faCamera} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('photo')}>
                        <FontAwesomeIcon icon={faFileImage} />
                    </TouchableOpacity>
                </View>
                {imageList && <FlatList
                    data={imageList}
                    keyExtractor={(item) => item.fileName}
                    renderItem={renderImage}
                    style={{ height: "100%" }}
                    contentContainerStyle={{ height: "100%", paddingLeft: 5 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />}

            </View>
        </SafeAreaView>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 2,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        padding: 30,
    },
    imageStyle: {
        width: "80%",
        height: "80%",
    },
});