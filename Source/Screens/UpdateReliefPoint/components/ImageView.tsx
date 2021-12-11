import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Modal, View, TouchableOpacity } from "react-native";
import { IMAGE_URL } from "../../../Constrants/url";
interface Props {
    img_url: any;
    visible: boolean;
    setVisible: any;
}
export default (props: Props) => {
    const { img_url, visible, setVisible } = props;
    console.log('response', visible)
    return (
        <Modal style={{ flex: 1 }} visible={visible}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <TouchableOpacity onPress={() => {
                    console.log("dsdasda")
                    setVisible(false)
                }} style={{ width: 50, paddingLeft: 10, paddingTop: 10 }}>
                    <FontAwesomeIcon icon={faChevronLeft} color="#FFF" size={20} />
                </TouchableOpacity>
                <Image
                    source={{ uri: `${IMAGE_URL}${img_url}` }}
                    style={{ width: '100%', height: '100%' }}
                    loadingIndicatorSource={require('../../')}
                    resizeMethod="resize"
                    resizeMode="contain"

                />
            </View>
        </Modal>
    )
}