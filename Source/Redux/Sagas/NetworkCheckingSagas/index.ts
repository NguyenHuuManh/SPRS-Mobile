import Toast from 'react-native-toast-message';
export function* onNetworkChecking(payload) {
    if (!payload.isConnect) {
        Toast.show({
            type: "error",
            text1: "Không có kết nối internet",
            position: "top"
        })
    }
}