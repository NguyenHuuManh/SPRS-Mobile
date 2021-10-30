import React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

export default ({ isVisible }: { isVisible: boolean }) => {
  console.log("isVisible", isVisible);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ zIndex: 99999 }}
      coverScreen={true}
    >
      <ActivityIndicator size="large" color="violet" />
    </Modal>
  );
};