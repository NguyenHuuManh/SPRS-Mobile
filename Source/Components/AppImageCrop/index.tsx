import { faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Button, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { height } from '../../Helper/responsive';
interface Props {
    visible?: boolean;
    setVisible?: any;
    onSave?: any;
}
export default (props: Props) => {
    const { visible, setVisible, onSave } = props;
    const [image, setImage] = useState<any>({});
    const openLibary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: true
        }).then(image => {
            console.log(image, 'image');
            setImage(image);
        })
    }

    const onpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: true
        }).then(image => {
            setImage(image);
        });
    }

    return (
        <Modal visible={visible}>
            <View style={{ paddingTop: 50 }}>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(false);
                        onSave && onSave(image);
                    }}
                    style={{ position: "absolute", right: 10, paddingTop: 10 }}
                >
                    <Text>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(false);
                        setImage({});
                    }}
                    style={{ position: "absolute", left: 10, paddingTop: 10 }}
                >
                    <Text>Hủy</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center", paddingTop: 10, marginBottom: 50 }}>
                    {image?.path ? (
                        <Image
                            source={{ uri: `${image.path}` }}
                            style={{ width: height * 0.4, height: height * 0.4, borderRadius: (height * 0.4) / 2 }}
                            loadingIndicatorSource={require('../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require('../../Assets/Images/userAvata.jpeg')}
                            style={{ width: height * 0.4, height: height * 0.4 }}
                            loadingIndicatorSource={require('../../Assets/Icons/Blinking_squares.gif')}
                            resizeMethod="scale"
                            resizeMode="cover"
                        />
                    )}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <TouchableOpacity
                        onPress={() => openLibary()}
                        style={{ alignItems: "center" }}
                    >
                        <Text>Thư viện</Text>
                        <FontAwesomeIcon icon={faFileImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onpenCamera()}
                        style={{ alignItems: "center" }}
                    >
                        <Text>Chụp ảnh</Text>
                        <FontAwesomeIcon icon={faCamera} />
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}