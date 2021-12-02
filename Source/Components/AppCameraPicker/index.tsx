// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import { faCamera, faFileImage, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { size } from 'lodash';
import React, { useState } from 'react';
import { isEmpty } from 'lodash'
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
    ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {
    CameraOptions,
    ImageLibraryOptions,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { MainStyle } from '../../Style/main_style';
import Loading from '../Loading';

interface Props {
    image: any,
    setImage: any,
    buttonSaveAction?: any,
    loading?: any;
}

const ImagePicker = (props: Props) => {
    const { image, setImage, buttonSaveAction, loading } = props;
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
            quality: 0,
            saveToPhotos: true,
            // includeBase64: true,

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
                setImage(response.assets[0]);
            });
        }
    };
    console.log("image", image.uri);
    const chooseFile = (type) => {
        let options: ImageLibraryOptions = {
            mediaType: type,
            quality: 1,
            selectionLimit: 1,
            // includeBase64: true,
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
            setImage(response.assets[0]);
        });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "column", justifyContent: "center", backgroundColor: "#DDDD", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, paddingTop: 10, paddingBottom: 10 }}>
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
                    {buttonSaveAction && (
                        <TouchableOpacity
                            style={[styles.buttonStyle]}
                            onPress={buttonSaveAction}>
                            <FontAwesomeIcon icon={faSave} />
                            <Text>Lưu</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {isEmpty(image) && (
                    <>
                        {loading && (
                            <View style={{ position: "absolute", zIndex: 1000, backgroundColor: "rgba(10, 10, 10,0.1)", width: "100%", height: "100%", justifyContent: "center", borderRadius: 10 }}>
                                <ActivityIndicator size="large" color="violet" />
                            </View>
                        )}
                        <View
                            style={[{ width: 130, marginBottom: 5, marginRight: 5, marginTop: 5, backgroundColor: "#FFF", borderRadius: 10 }, MainStyle.boxShadow]}>
                            <TouchableOpacity style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
                                onPress={() => { }}
                            >
                                <FontAwesomeIcon icon={faTimesCircle} size={20} color="black" />
                            </TouchableOpacity>
                            <Image
                                source={{ uri: image.uri }}
                                style={[styles.imageStyle]}
                                width={50}
                            />
                        </View>
                    </>
                )}
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
        paddingBottom: 20,
        paddingTop: 20,
    },
    imageStyle: {
        // width: "80%",
        // height: "80%",
        backgroundColor: "red",
        width: 50,
        height: 50
    },
});