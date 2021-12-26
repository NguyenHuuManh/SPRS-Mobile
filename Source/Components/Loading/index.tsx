import React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { AppColor } from '../../Helper/propertyCSS';
import styles from './styles';

export default ({ isVisible }: { isVisible: boolean }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ zIndex: 99999 }}
      coverScreen={true}
    >
      <ActivityIndicator size="large" color={AppColor.BUTTON_MAIN} />
    </Modal>
  );
};