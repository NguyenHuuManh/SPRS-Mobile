import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import Toast from 'react-native-toast-message';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { navigationRef } from "./Helper/RootNavigation";
import RootStackScreen from "./Routers";
import { persistor, store } from "./Store";
interface Props {
    content?: any;
}


interface Store {
    user: { user: any, setUser: any }
}

const initialState = {
    user: { user: {}, setUser: () => { } }
};

export const Store = React.createContext<Store>(initialState);

export default (props: Props) => {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer ref={navigationRef}>
                    <RootStackScreen />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </NavigationContainer>
            </PersistGate>
        </Provider>

    )
}